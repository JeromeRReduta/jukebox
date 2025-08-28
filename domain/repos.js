/**
 * @typedef PlaylistRepo
 *
 * @property {DbContext} dbContext obj we delegate database queries to
 * @function getAllAsync ({includeTracks = false}) => Playlist[] Gets all playlists. If includeTracks is true, also queries associated tracks (else is null)
 * @function getByIdAsync ({id, includeTracks = false}) => Playlist Gets one playlist by id. If includeTracks is true, also queries associated tracks
 * @function createAsync ({name, description}) => Playlist adds a playlist to database and returns created obj
 */

/**
 * @typedef TrackRepo
 * @property {DbContext} dbContext obj we delegate database queries to
 * @function getAllAsync () => Track[] Gets all tracks
 * @function getByIdAsync ({id}) => Track Gets one track by id
 * @function createAsync ({name, duration_ms}) => Track Adds a track to DB and returns created obj
 */

/**
 * @typedef PlaylistsTracksRepo
 * @property {DBContext} dbContext obj we delegate database qeuries to
 * @function createAsync ({playlist_id, track_id}) => PlaylistsTracks entry Adds a relation between playlists and tracks and returns created obj
 */
