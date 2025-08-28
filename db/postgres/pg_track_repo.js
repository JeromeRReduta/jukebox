import { queryStrings } from "./pg_query_manager.js";

export default class PgTrackRepo {
  /** atm, postgresql tracks & domain tracks are the same obj so can just get as-is*/

  #dbContext;

  constructor({ pgQueryManager }) {
    this.#dbContext = pgQueryManager;
  }

  async getAllAsync() {
    return await this.#dbContext.queryAll({
      queryString: queryStrings.allFromTracks,
    });
  }
  async getByIdAsync({ id }) {
    return await this.#dbContext.queryOne({
      queryString: queryStrings.oneFromTracks,
      values: [id],
    });
  }

  async createAsync({ track: { name, duration_ms } }) {
    return await this.#dbContext.queryOne({
      queryString: queryStrings.insertIntoTracks,
      values: [name, duration_ms],
    });
  }
}

/**
 * @typedef TrackRepo
 * @property {DbContext} dbContext obj we delegate database queries to
 * @function getAllAsync () => Track[] Gets all tracks
 * @function getByIdAsync ({id}) => Track Gets one track by id
 * @function createAsync ({name, duration_ms}) => Track Adds a track to DB and returns created obj\
 */

/**
 * @typedef Track
 * @property {Number} id
 * @property {String} name
 * @property {Number} duration_ms
 */
export function createTrack({ id, name, duration_ms }) {
  return { id, name, duration_ms };
}

/**
 * @typedef PlaylistRepo
 *
 * @property {DbContext} dbContext obj we delegate database queries to
 * @function getAllAsync ({includeTracks = false}) => Playlist[] Gets all playlists. If includeTracks is true, also queries associated tracks (else is null)
 * @function getByIdAsync ({id, includeTracks = false}) => Playlist Gets one playlist by id. If includeTracks is true, also queries associated tracks
 * @function createAsync ({name, description}) => Playlist adds a playlist to database and returns created obj
 */

export function pgResponseToTrack({ pgResponse: { id, name, duration_ms } }) {
  /** atm, postgresql tracks & domain tracks are the same obj*/
  return { id, name, duration_ms };
}
