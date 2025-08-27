/** Listing types */

/**
 * @typedef Playlist
 * @property {Number} id
 * @property {String} name
 * @property {String} description
 * @property {Track[]} tracks optional parameter, for if you want
 */

export function createPlaylist({ id, name, description, tracks = null }) {
  return { id, name, description, tracks };
}

/**
 * @typedef Track
 * @property {Number} id
 * @property {String} name
 * @property {Number} durationMs
 */
export function createTrack({ id, name, durationMs }) {
  return { id, name, durationMs };
}
