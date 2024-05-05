export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: 'App',
  url: 'http://localhost:3000',
  ogImage: 'http://localhost:3000/og.jpg',
  creator: 'Leonardo Sancho',
  description: '',
  mainNav: [
    {
      title: 'Home',
      href: '/'
    }
  ]
}
