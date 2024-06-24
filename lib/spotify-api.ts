export async function getAccessToken(code: string) {
  const params = new URLSearchParams()
  params.append("client_id", process.env.CLIENT_ID!)
  params.append("client_secret", process.env.CLIENT_SECRET!)
  params.append("grant_type", "authorization_code")
  params.append("code", code)
  params.append("redirect_uri", process.env.REDIRECT_URI!)

  return await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
  })
  .then(response => response.json())
}

export async function fetchProfile(token: string) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  })

  if (response.ok) {
    return response.json()
  }
  return undefined
}