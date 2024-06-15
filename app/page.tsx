import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import { generateRandomString, objectToQueryString } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { seed } from '@/lib/seed'
import { sql } from '@vercel/postgres'

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
    auth()
  } 
  // else {
  //   accessToken = await getAccessToken(code.toString());
  //   if (accessToken["error"] !== undefined) auth()
  // }
  let data
  await seed()
  data = await sql`
    SELECT DISTINCT s.id, s.title 
    FROM songs s 
    JOIN songtags st ON s.id = st.song_id`
  const { rows: songs } = data

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <Suspense fallback={<TablePlaceholder />}>
        <Table songs = { songs } />
      </Suspense>
    </main>
  )
}

function auth() {
  var state = generateRandomString(16)
    var scope = 'user-read-private user-read-email'

    redirect('https://accounts.spotify.com/authorize?' +
      objectToQueryString({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      }))
}

// async function getAccessToken(code: string) {
//   const params = new URLSearchParams()
//   params.append("client_id", process.env.CLIENT_ID!)
//   params.append("client_secret", process.env.CLIENT_SECRET!)
//   params.append("grant_type", "authorization_code")
//   params.append("code", code)
//   params.append("redirect_uri", process.env.REDIRECT_URI!)

//   return await fetch("https://accounts.spotify.com/api/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: params
//   })
//   .then(response => response.json())
// }
