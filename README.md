# dsh-publora

Publora publishes and schedules social media posts. With this plugin a DeepSeek Harness agent can check which accounts you have connected, save a draft, schedule a post, or publish it on LinkedIn, X, Instagram, Threads, TikTok, YouTube, Facebook, Bluesky, Mastodon and Telegram.

## What you need

A Publora account with at least one connected social account. You can [register for free](https://publora.com/register) and connect accounts in the [dashboard](https://app.publora.com/dashboard).

The free Starter plan includes 3 social accounts, 15 posts a month, 3 scheduled posts at a time and scheduling up to 7 days ahead. It covers every network except X, which needs a paid plan. See [pricing](https://publora.com/pricing).

## Setup

Install the plugin:

```bash
dsh plugin --profile web add "github:publora-team/dsh-publora"
```

Create an API key at [app.publora.com/dashboard/api](https://app.publora.com/dashboard/api), set it before you start DSH, then restart DSH:

```bash
export PUBLORA_API_KEY=your-api-key
dsh web
```

DSH's MCP client does not support OAuth, so this plugin needs an API key. The key can post to your connected accounts. Keep it out of files you share.

## What's included

The Publora MCP server at `https://mcp.publora.com/mcp`, with tools named `mcp__publora__*`, and nine skills that hold each network's rules: `linkedin-post`, `linkedin-analytics`, `x-post`, `instagram-post`, `threads-post`, `tiktok-post`, `bluesky-post`, `telegram-post` and `social-post` for YouTube, Facebook Pages and Mastodon.

## Try it

- Show which social accounts are connected to my Publora workspace
- Write a LinkedIn post about the latest change in this repo and save it as a draft

Read each tool call before you approve it, because a post that has been published goes out to your audience.

## Help

- Troubleshooting: [docs.publora.com/mcp/troubleshooting](https://docs.publora.com/mcp/troubleshooting)
- Support: [support@publora.com](mailto:support@publora.com)
- [Privacy policy](https://publora.com/privacy) and [terms](https://publora.com/terms)

MIT licensed.
