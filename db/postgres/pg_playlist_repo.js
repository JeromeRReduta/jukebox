import { queryStrings } from "./pg_query_manager.js";

export default class PgPlaylistRepo {
  #dbContext;

  constructor({ pgQueryManager }) {
    this.#dbContext = pgQueryManager;
  }

  async getAllAsync({ includeTracks = false } = {}) {
    const queryString = includeTracks
      ? queryStrings.allFromPlaylistsWithTracks
      : queryStrings.allFromPlaylists;
    const responses = await this.#dbContext.queryAll({ queryString });
    if (responses.length == 0) {
      return null;
    }
    return responses.map((response) => pgResponseToPlaylist({ response }));
  }

  async getByIdAsync({ id, includeTracks = false }) {
    const queryString = includeTracks
      ? queryStrings.oneFromPlaylistsWithTracks
      : queryStrings.oneFromPlaylists;
    const response = await this.#dbContext.queryOne({
      queryString,
      values: [id],
    });
    if (!response) {
      return null;
    }
    return pgResponseToPlaylist({ response });
  }

  async createAsync({ name, description }) {
    const response = await this.#dbContext.queryOne({
      queryString: queryStrings.insertIntoPlaylists,
      values: [name, description],
    });
    if (!response) {
      // don't think this'll run but just in case
      return null;
    }
    return pgResponseToPlaylist({ response });
  }
}

export function pgResponseToPlaylist({
  response: { id, name, description, tracks_included },
}) {
  return {
    id,
    name,
    description,
    tracksIncluded: tracks_included ?? null,
  };
}
