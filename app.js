import db from "#db/client";
import PgQueryManager, { queryStrings } from "#db/postgres/pg_query_manager";
import express from "express";
const app = express();

app.use(express.json());

app.route("/").get(async (req, res) => {
  const queryManager = new PgQueryManager({ db: db });
  const thing = await queryManager.queryAll({
    queryString: queryStrings.allFromPlaylists,
  });
  res.status(200).send(thing);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message ?? "error raised");
});

export default app;
