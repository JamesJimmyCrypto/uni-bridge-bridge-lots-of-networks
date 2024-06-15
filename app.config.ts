const title =  'UNI Bridge'
export default defineAppConfig({
  title,
  titleBadge: 'Beta',
  titleTemplate: `%s - ${title}`,
  description: 'UNI Bridge for All BlockChains',
  ogImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
  links: [
    {
      label: 'Docs',
      to: '/docs'
    },
    {
      label: 'Pricing',
      to: '/pricing'
    },
    {
      label: 'Blog',
      to: '/blog'
    }
  ],
  ui: {
    primary: 'sky',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500
      }
    }
  },
  showFooterTop: false,
})
