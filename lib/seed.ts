import { sql } from '@vercel/postgres'

export async function seed() {
  await Promise.all([
    sql`
      CREATE TABLE IF NOT EXISTS songs (
        id TEXT PRIMARY KEY NOT NULL,
        title TEXT NOT NULL
      )
    `,
    sql`
      CREATE TABLE IF NOT EXISTS songtags (
        song_id TEXT NOT NULL,
        tag TEXT NOT NULL,
        PRIMARY KEY (song_id, tag),
        FOREIGN KEY(song_id) REFERENCES songs(id)
      )
    `
  ])
}
