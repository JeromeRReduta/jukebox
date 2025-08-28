import { queryStrings } from "./pg_query_manager.js";

export default class PgTrackRepo {
  /** atm, postgresql tracks & domain tracks are the same obj so can just get as-is*/

  #dbContext;

  constructor({ pgQueryManager }) {
    this.#dbContext = pgQueryManager;
  }

  async getAllAsync() {
    const response = await this.#dbContext.queryAll({
      queryString: queryStrings.allFromTracks,
    });
    return response.length == 0 ? null : response;
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
