import { getServerSideSitemapIndexLegacy } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { techType } from '@/infra/models'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const techs = fetch('/api/techs/all')
    .then(async (res) => await res.json() as Array<techType & { id: string }>)
    .catch(() => [])

  const techsUrl = (await techs).map(tech => `https://miguellb.net/techs/${tech.id}`)

  return getServerSideSitemapIndexLegacy(ctx, [
    ...techsUrl
  ])
}

// Default export to prevent next.js errors
export default function SitemapIndex() {}
