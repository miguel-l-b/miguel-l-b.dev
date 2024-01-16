import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//miguellb.net/api')

  return getServerSideSitemapIndexLegacy(ctx, [
    'https://miguellb.net/path-1.xml',
    'https://miguellb.netpath-2.xml',
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
