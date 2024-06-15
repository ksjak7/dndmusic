import { sql } from '@vercel/postgres'
import RefreshButton from './refresh-button'
import { seed } from '@/lib/seed'

export default async function Table() {
  let data

  await seed()
  data = await sql`SELECT * FROM songtags`
  const { rows: songs } = data

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Songs</h2>
        </div>
        <div className='flex flex-row justify-end gap-5'>
          <h2 className='text-sm text-gray-500 hover:text-gray-900'>Filter</h2>
          <button className='text-sm text-gray-500 hover:text-gray-900'>Add</button>
          <RefreshButton />
        </div>
      </div>
      <ol className="divide-y divide-gray-900/5">
        {songs.map((song) => (
            <div key={song.song_id}>
              <iframe src={`https://open.spotify.com/embed/track/${song.song_id}?utm_source=generator`} width="100%" height="200" loading="lazy"></iframe>
            </div>
        ))}
      </ol>
    </div>
  )
}
