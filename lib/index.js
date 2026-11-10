import { readFileSync, readdirSync } from 'node:fs'
import z from '@deepseek-ai/schemastery'

export const name = 'dsh-publora'

export const MCP_URL = 'https://mcp.publora.com/mcp'

export const Config = z.object({
  apiKeyEnv: z.string().default('PUBLORA_API_KEY'),
})

const skillsRoot = new URL('../skills/', import.meta.url)

export function parseSkill(text) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text)
  if (!match) throw new Error('SKILL.md has no frontmatter')
  const field = (key) => {
    const line = new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(match[1])
    if (!line) throw new Error(`SKILL.md has no ${key}`)
    const value = line[1].trim()
    return value.startsWith('"') ? JSON.parse(value) : value
  }
  return { name: field('name'), description: field('description'), content: text.slice(match[0].length).trim() }
}

export function loadSkills(root = skillsRoot) {
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => parseSkill(readFileSync(new URL(`${entry.name}/SKILL.md`, root), 'utf8')))
}

export function apply(ctx, config) {
  const { apiKeyEnv } = Config(config ?? {})
  const apiKey = String(process.env[apiKeyEnv] ?? '').trim()
  if (!apiKey) ctx.logger?.warn?.(`dsh-publora: ${apiKeyEnv} is not set, Publora tools will return 401`)

  ctx.provide('publora', {
    url: MCP_URL,
    get headers() {
      return apiKey ? { Authorization: `Bearer ${apiKey}` } : {}
    },
  })

  ctx.inject(['skills'], (skillsCtx) => {
    for (const skill of loadSkills()) {
      skillsCtx.skills.register({
        ...skill,
        source: 'runtime',
        invocation: { modelInvocable: true, userInvocable: true },
      })
    }
  })
}
