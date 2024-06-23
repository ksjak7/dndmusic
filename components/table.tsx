'use client'
import { useState } from 'react'
import RefreshButton from './refresh-button'
import { QueryResultRow } from '@vercel/postgres'

export default function Table(
  {
    songs
  }:
    {
      songs: QueryResultRow[]
    }
) {

  const [currentSongId, setCurrent] = useState(songs[0].id)
  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <iframe src={`https://open.spotify.com/embed/track/${currentSongId}?utm_source=generator`} width="100%" height="200" allow="" loading="lazy"></iframe>
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Songs</h2>
        </div>
        <div className='flex flex-row justify-end gap-5'>
          <button className='text-sm text-gray-500 hover:text-gray-900'>Filter</button>
          <button className='text-sm text-gray-500 hover:text-gray-900'>Add</button>
          <RefreshButton />
        </div>
      </div>
      <ol className='flex flex-col'>
        {
          songs.map((song) => (
            <li key={song.id} className='flex flex-row mb-5 outline outline-1 rounded-full px-5 py-1 outline-gray-300 shadow justify-between'>
              <button className="w-full text-start" onClick={() => { if (currentSongId != song.id) setCurrent(song.id) }}>
                {song.title}
              </button>
              <button>
                ⋯
              </button>
            </li>
          ))
        }
      </ol>
    </div>
  )
}

// EmbedController.addListener('playback_update', e => {
//   document.getElementById('progressTimestamp').innerText = `${parseInt(e.data.position / 1000, 10)} s`;
//   });
