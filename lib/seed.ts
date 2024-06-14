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
        FOREIGN KEY(song_id) REFERENCES songs(id)
      )
    `,
    sql`
      INSERT INTO songs (id, title) VALUES ('6AI3ezQ4o3HUoP6Dhudph3', 'Not Like Us')
    `,
    sql`
      INSERT INTO songtags (song_id, tag) VALUES ('6AI3ezQ4o3HUoP6Dhudph3', 'rap')
    `
  ])
}
