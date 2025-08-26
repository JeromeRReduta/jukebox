DROP TABLE IF EXISTS tracks CASCADE;
DROP TABLE IF EXISTS playlists CASCADE;
DROP TABLE IF EXISTS playlists_tracks;

CREATE TABLE playlists (
    id              SERIAL          PRIMARY KEY,
    name            TEXT            NOT NULL,
    description     TEXT            NOT NULL
);

CREATE TABLE tracks (
    id              SERIAL          PRIMARY KEY,
    name            TEXT            NOT NULL,
    duration_ms     INTEGER         NOT NULL
);

CREATE TABLE playlists_tracks (
    id              SERIAL          PRIMARY KEY,
    playlist_id     INTEGER         NOT NULL        REFERENCES playlists        ON DELETE CASCADE,
    track_id        INTEGER         NOT NULL        REFERENCES tracks           ON DELETE CASCADE,
    UNIQUE (playlist_id, track_id)
);
