import assert from 'node:assert/strict'
import { test } from 'node:test'
import { loadSkills, parseSkill } from '../lib/index.js'

test('parses plain and quoted descriptions', () => {
  assert.deepEqual(parseSkill('---\nname: a-b\ndescription: "x: y"\n---\n\nBody'), { name: 'a-b', description: 'x: y', content: 'Body' })
  assert.equal(parseSkill('---\nname: a\ndescription: plain\n---\nB').description, 'plain')
})

test('loads all nine skills without Antigravity wording', () => {
  const skills = loadSkills()
  assert.equal(skills.length, 9)
  for (const skill of skills) {
    assert.match(skill.name, /^[a-z0-9]+(-[a-z0-9]+)*$/)
    assert.ok(skill.description.length > 0)
    assert.doesNotMatch(skill.content, /Antigravity/)
  }
})
