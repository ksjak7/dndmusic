import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import { seed } from '@/lib/seed'
import { sql } from '@vercel/postgres'
import { AuthenticatePage } from '@/components/authenticate-page'
import { redirect } from 'next/navigation'
import { fetchProfile, getAccessToken } from '@/lib/spotify-api'

export default async function Home(
  {
    params,
    searchParams,
  }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
  const code = searchParams['code']
  let accessToken

  if (!code) {
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <AuthenticatePage client_id = { process.env.CLIENT_ID! } redirect_uri = { process.env.REDIRECT_URI! } />
      </main>
    )
  } 
  else {
    accessToken = await getAccessToken(code.toString());
    if (accessToken["error"] !== undefined) redirect("/")
  }

  const profileData = await fetchProfile(accessToken.access_token)

  let data
  await seed()
  data = await sql`
    SELECT DISTINCT s.id, s.title 
    FROM songs s 
    JOIN songtags st ON s.id = st.song_id`
  const { rows: songs } = data

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h2>Hello, {profileData.display_name}</h2>
      <Suspense fallback={<TablePlaceholder />}>
        <Table songs = { songs } />
      </Suspense>
    </main>
  )
}
