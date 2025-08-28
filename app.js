import db from "#db/client";

import PgQueryManager from "./db/postgres/pg_query_manager.js";
import PgTrackRepo from "#db/postgres/pg_track_repo";
import express from "express";
import { createTrack } from "#domain/entities";
const app = express();

app.use(express.json());

app.route("/").get(async (req, res) => {
  const queryManager = new PgQueryManager({ db: db });
  //   const thing = await queryManager.queryAll({
  //     queryString: queryStrings.allFromPlaylists,
  //   });
  const repo = new PgTrackRepo({ pgQueryManager: queryManager });
  const thing = await repo.getAllAsync();
  res.status(200).send(thing);
});

app.route("/postTest").get(async (req, res, next) => {
  const queryManager = new PgQueryManager({ db: db });
  //   const thing = await queryManager.queryAll({
  //     queryString: queryStrings.allFromPlaylists,
  //   });
  const repo = new PgTrackRepo({ pgQueryManager: queryManager });
  const newTrack = createTrack({ id: 69, name: "TEST", duration_ms: 420 });
  const thing = await repo.createAsync({ track: newTrack });
  res.status(200).send(thing);
});

app.route("/:id").get(async (req, res, next) => {
  const queryManager = new PgQueryManager({ db: db });
  //   const thing = await queryManager.queryAll({
  //     queryString: queryStrings.allFromPlaylists,
  //   });
  const repo = new PgTrackRepo({ pgQueryManager: queryManager });
  const thing = await repo.getByIdAsync({ id: +req.params.id });
  res.status(200).send(thing);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message ?? "error raised");
});

export default app;
