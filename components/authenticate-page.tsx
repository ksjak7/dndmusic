'use client'
import { objectToQueryString } from "@/lib/utils"
import SpotifyLogo from "./spotify-logo"

export function AuthenticatePage(
  {
    client_id,
    redirect_uri,
    state,
    scope
  }: {
    client_id: string,
    redirect_uri: string,
    state: string,
    scope: string
  }
) {

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="items-center flex flex-col gap-5">
        <SpotifyLogo />
        <p>This website requires Spotify to play music.</p>
        <a
          className="bg-[#1ed760] text-white p-4 rounded-full max-w-fit"
          href={'https://accounts.spotify.com/authorize?' +
            objectToQueryString({
              response_type: 'code',
              client_id: client_id,
              scope: scope,
              redirect_uri: redirect_uri,
              state: state,
            })}>
          Authenticate Spotify
        </a>
      </div>
    </div>
  )
}