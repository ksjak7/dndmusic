import { getAccessToken } from "@/lib/spotify-api"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(
  request: NextRequest
) {
  const code = request.nextUrl.searchParams.get('code')?.toString()
  if (!code) {
    redirect('/')
  }

  const accessToken = await getAccessToken(code)
  if (accessToken["error"] !== undefined) {
    redirect('/')
  }

  cookies().set('access_token', accessToken.access_token, { secure: true })

  redirect('/')
}

