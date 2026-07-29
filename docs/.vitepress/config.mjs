import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Planning Software',
    description: 'Planning Software: A Torrent Client Case Study',
    base: '/learn_planning/',

    themeConfig: {
      nav: [
        { text: 'Introduction', link: '/' },
        { text: 'Part I', link: '/part1/why-plan' },
        { text: 'Part II', link: '/part2/01-problem-framing' },
        { text: 'Part III', link: '/part3/claude-and-progress' },
      ],

      sidebar: [
        {
          text: 'Part I — How To Plan Any Software',
          items: [
            { text: 'Why Plan At All', link: '/part1/why-plan' },
            { text: 'The Planning Toolkit', link: '/part1/toolkit' },
            { text: 'The Planning Pipeline', link: '/part1/pipeline' },
          ],
        },
        {
          text: 'Part II — Case Study: A BitTorrent Client in Rust',
          items: [
            { text: 'Problem Framing', link: '/part2/01-problem-framing' },
            { text: 'Requirements & Scope', link: '/part2/02-requirements' },
            { text: 'Domain Model', link: '/part2/03-domain-model' },
            { text: 'System Architecture', link: '/part2/04-architecture' },
            { text: 'Concurrency Model', link: '/part2/05-concurrency' },
            { text: 'State Machines', link: '/part2/06-state-machines' },
            { text: 'Data Flow', link: '/part2/07-data-flow' },
            { text: 'Crate & Module Layout', link: '/part2/08-module-layout' },
            { text: 'Milestones & Sequencing', link: '/part2/09-milestones' },
            { text: 'Risk Analysis', link: '/part2/10-risks' },
            { text: 'Testing Strategy', link: '/part2/11-testing' },
          ],
        },
        {
          text: 'Part III — Wrap Up',
          items: [
            { text: 'Turning This Into CLAUDE.md and PROGRESS.md', link: '/part3/claude-and-progress' },
            { text: 'Applying This Method To Your Own App', link: '/part3/generalizing' },
          ],
        },
      ],

      search: {
        provider: 'local',
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/PiyushXCoder/learn_planning' },
      ],
    },
  }),
)
