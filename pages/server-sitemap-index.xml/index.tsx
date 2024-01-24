import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import getBaseUrl from '@/infra/utils/url'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const techs = await fetch(`${getBaseUrl()}/api/techs/keys`).then(async (e) => await e.json() as string[])
  return getServerSideSitemapIndexLegacy(ctx, [
    ...techs.flatMap(e => `${getBaseUrl()}/techs/${e}`)
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
