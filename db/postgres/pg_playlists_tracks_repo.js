import { queryStrings } from "./pg_query_manager.js";

export default class PgPlaylistsTracksRepo {
  #dbContext;

  constructor({ pgQueryManager }) {
    this.#dbContext = pgQueryManager;
  }

  async createAsync({ playlist_id, track_id }) {
    return await this.#dbContext.queryOne({
      queryString: queryStrings.insertIntoPlaylistsTracks,
      values: [playlist_id, track_id],
    });
  }
}
