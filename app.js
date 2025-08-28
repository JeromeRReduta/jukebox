import db from "#db/client";

import PgQueryManager from "./db/postgres/pg_query_manager.js";
import express from "express";
import PgPlaylistRepo from "#db/postgres/pg_playlist_repo";
import PgTrackRepo from "#db/postgres/pg_track_repo";
import trackRouter from "./api/tracks.js";
import playlistRouter from "./api/playlists.js";
import PgPlaylistsTracksRepo from "#db/postgres/pg_playlists_tracks_repo";
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const pgQueryManager = new PgQueryManager({ db });
  req.playlistRepo = new PgPlaylistRepo({ pgQueryManager });
  req.trackRepo = new PgTrackRepo({ pgQueryManager });
  req.playlistsTracksRepo = new PgPlaylistsTracksRepo({ pgQueryManager });
  next();
});

app.use("/tracks", trackRouter);
app.use("/playlists", playlistRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.code).send(err.message);
});

export default app;
