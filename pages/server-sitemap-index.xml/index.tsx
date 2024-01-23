import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { TechType } from '@/infra/models/db/tech'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const techs = await fetch(`http://${process.env.DOMAIN}/api/techs/keys`).then(async (e) => await e.json() as string[])
  return getServerSideSitemapIndexLegacy(ctx, [
    ...techs.flatMap(e => `https://${process.env.DOMAIN}/techs/${e}`)
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
