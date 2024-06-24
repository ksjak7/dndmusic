import { Suspense } from 'react'
import Table from '@/components/table'
import TablePlaceholder from '@/components/table-placeholder'
import { seed } from '@/lib/seed'
import { sql } from '@vercel/postgres'
import { AuthenticatePage } from '@/components/authenticate-page'
import { redirect } from 'next/navigation'
import { fetchProfile, getAccessToken } from '@/lib/spotify-api'
import { generateRandomString, objectToQueryString } from '@/lib/utils'
import { cookies } from 'next/headers'

export default async function Home() {
  if (!cookies().has('access_token')) {
    var state = generateRandomString(16)
    var scope = 'user-read-private user-read-email'
    return (
      <main className="relative flex min-h-screen flex-col items-center justify-center">
        <AuthenticatePage client_id={process.env.CLIENT_ID!} redirect_uri={process.env.REDIRECT_URI!} state={state} scope={scope} />
      </main>
    )
  }

  const accessTokenCookie = cookies().get('access_token')
  if (accessTokenCookie === undefined || accessTokenCookie.value == "") {
    console.log("Invalid AccessToken; reauthenticating")
    await auth()
    return
  }
  const accessToken = accessTokenCookie.value
  console.log("AccessToken", accessToken)
  const profileData = await fetchProfile(accessToken)

  console.log(profileData)

  let data
  await seed()
  data = await sql`
    SELECT DISTINCT s.id, s.title 
    FROM songs s`
  const { rows: songs } = data

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h2>Hello, {profileData.display_name}</h2>
      <Suspense fallback={<TablePlaceholder />}>
        <Table songs={songs} />
      </Suspense>
    </main>
  )
}

async function auth() {
  var scope = 'user-read-private user-read-email'
  var state = generateRandomString(16)
  redirect('https://accounts.spotify.com/authorize?' +
    objectToQueryString({
      response_type: 'code',
      client_id: process.env.CLIENT_ID!,
      scope: scope,
      redirect_uri: process.env.REDIRECT_URI!,
      state: state,
    }))
}