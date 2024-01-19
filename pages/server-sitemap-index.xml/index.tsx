import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { techType } from '@/infra/models'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return getServerSideSitemapIndexLegacy(ctx, [
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
