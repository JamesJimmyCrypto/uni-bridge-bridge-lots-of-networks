const title =  'UNI Bridge'
export default defineAppConfig({
  title,
  titleBadge: 'AO',
  titleTemplate: `%s - ${title}`,
  description: 'UNI Bridge for All BlockChains',
  ogImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterImage: "https://dashboard-template.nuxt.dev/social-card.png",
  twitterCard: "summary_large_image",
  links: () => {
    return  [
      {
        label: 'Stake',
        to: '/stake'
      },
      {
        label: 'Bridge',
        to: '/bridge-intro'
      },
      {
        label: 'Trade',
        to: '/trade'
      },
      {
        label: 'Blog',
        to: '/blog'
      },
      {
        label: 'About',
        to: '/about'
      },
    ]
  },
  ui: {
    primary: 'sky',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500
      }
    },
  },
  showFooterTop: false,
})
