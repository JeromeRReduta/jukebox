import db from "#db/client";

import PgQueryManager from "./db/postgres/pg_query_manager.js";
import express from "express";
import PgPlaylistRepo from "#db/postgres/pg_playlist_repo";
const app = express();

app.use(express.json());

app.route("/").get(async (req, res) => {
  const queryManager = new PgQueryManager({ db: db });
  const repo = new PgPlaylistRepo({ pgQueryManager: queryManager });
  const thing = await repo.getAllAsync();
  res.status(200).send(thing);
});

app.route("/deluxe").get(async (req, res) => {
  const queryManager = new PgQueryManager({ db: db });
  const repo = new PgPlaylistRepo({ pgQueryManager: queryManager });
  const thing = await repo.getAllAsync({ includeTracks: true });
  res.status(200).send(thing);
});

app.route("/postTest").get(async (req, res, next) => {
  const queryManager = new PgQueryManager({ db: db });
  const repo = new PgPlaylistRepo({ pgQueryManager: queryManager });
  const thing = await repo.createAsync({
    name: "tiffany",
    description: "tiffany's playlist",
  });
  res.status(200).send(thing);
});

app.route("/:id").get(async (req, res, next) => {
  const queryManager = new PgQueryManager({ db: db });
  const repo = new PgPlaylistRepo({ pgQueryManager: queryManager });
  const thing = await repo.getByIdAsync({ id: +req.params.id });
  console.log(thing);
  res.status(200).send(thing);
});

app.route("/:id/deluxe").get(async (req, res, next) => {
  const queryManager = new PgQueryManager({ db: db });
  const repo = new PgPlaylistRepo({ pgQueryManager: queryManager });
  const thing = await repo.getByIdAsync({
    id: +req.params.id,
    includeTracks: true,
  });
  console.log(thing);
  res.status(200).send(thing);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message ?? "error raised");
});

export default app;
