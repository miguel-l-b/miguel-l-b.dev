import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//miguellb.net/api')

  return getServerSideSitemapIndexLegacy(ctx, [
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
