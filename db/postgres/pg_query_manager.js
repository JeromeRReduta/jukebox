import { text } from "express";

export default class PgQueryManager {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async queryAll({ queryString, values, isPlural }) {
    const { rows } = await this.#db.query({
      text: queryString,
      values: values,
    });
    return rows;
  }

  async queryOne({ queryString, values }) {
    const {
      rows: [result],
    } = await this.#db.query({
      text: queryString,
      values: values,
    });
    return result;
  }
}

export const queryStrings = {
  allFromPlaylists: `SELECT * FROM playlists`,
  allFromPlaylistsWithTracks: `SELECT p.name, p.id, JSON_AGG(JSON_BUILD_OBJECT( 'id', t.id,
                                                                                'name', t.name,
                                                                                'duration_ms', t.duration_ms,
                                                                                'playlist_id', pt.playlist_id))
                                                                                AS included_tracks
    FROM playlists AS p
    JOIN playlists_tracks AS pt ON pt.playlist_id = p.id
    JOIN tracks AS t ON pt.track_id = t.id
    GROUP BY p.name, p.id
    ORDER BY p.id
  `,
  oneFromPlaylists: `SELECT * FROM playlists
                        WHERE id = $1`,
  oneFromPlaylistsWithTracks: `SELECT p.name, p.id, JSON_AGG(JSON_BUILD_OBJECT( 'id', t.id,
                                                                                'name', t.name,
                                                                                'duration_ms', t.duration_ms,
                                                                                'playlist_id', pt.playlist_id))
                                                                                AS included_tracks
    FROM playlists AS p
    JOIN playlists_tracks AS pt ON pt.playlist_id = p.id
    JOIN tracks AS t ON pt.track_id = t.id
    WHERE pt.playlist_id = $1
    GROUP BY p.name, p.id
    ORDER BY p.id
  `,
  allFromTracks: `SELECT * FROM tracks`,
  oneFromTracks: `SELECT * FROM tracks
                    WHERE id = $1`,
};
//   allFromPlaylistsWithTracks: `
//   SELECT P.id, P.name, P.description, JSON_AGG(T.*) AS tracks_included
//                                 FROM playlists AS P
//                                 JOIN playlists_tracks AS PT ON P.id = PT.playlist_id
//                                 JOIN tracks AS T ON T.id = PT.track_id
//                                 GROUP BY P.id, P.name, P.description
//                                 ORDER BY P.id
//                                 `,
