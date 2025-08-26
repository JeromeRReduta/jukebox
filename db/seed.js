import db from "#db/client";

/**
 * TODO: >=20 tracks, >= 10 playlists, >=15 playlists_tracks
 */
const numTracks = 20;
const numPlaylists = 10;
const numTrackIds = 5;
const numPlaylistIds = 3;

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function addTrack({ name, duration_ms }) {
  await db.query({
    text: `
        INSERT INTO tracks (name, duration_ms)
        VALUES ($1, $2)
        `,
    values: [name, duration_ms],
  });
}

async function getTrackIds() {
  const { rows: tracks } = await db.query(`SELECT id FROM tracks`);
  return tracks.map((track) => track.id);
}

async function addPlaylist({ name, description }) {
  await db.query({
    text: `
        INSERT INTO playlists (name, description)
        VALUES ($1, $2)
        `,
    values: [name, description],
  });
}

async function addPlaylistTrack({ playlist_id, track_id }) {
  await db.query({
    text: `
        INSERT INTO playlists_tracks (playlist_id, track_id)
        VALUES ($1, $2)
        `,
    values: [playlist_id, track_id],
  });
}

async function seed() {
  for (let i = 1; i < numTracks + 1; i++) {
    await addTrack({ name: `Track ${i}`, duration_ms: 222 });
  }
  for (let i = 1; i < numPlaylists + 1; i++) {
    await addPlaylist({ name: `Playlist ${i}`, description: `seeded` });
  }
  const trackIds = (await db.query(`SELECT id FROM tracks`)).rows.map(
    (track) => track.id
  );
  const playlistIds = (await db.query(`SELECT id FROM playlists`)).rows.map(
    (playlist) => playlist.id
  );
  for (let i = 0; i < numTrackIds; i++) {
    for (let j = 0; j < numPlaylistIds; j++) {
      await addPlaylistTrack({
        track_id: trackIds[i],
        playlist_id: playlistIds[j],
      });
    }
  }
}
