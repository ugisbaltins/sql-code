export const selectActorByName = (fullName: string): string => {
  return `SELECT full_name, id FROM actors WHERE full_name = '${fullName}';`;
};

export const selectKeyword = (keyword: string): string => {
  return `SELECT keyword, id FROM keywords WHERE keyword = '${keyword}';`;
};

export const selectDirector = (director: string): string => {
  return `SELECT full_name, id FROM DIRECTORS WHERE full_name = '${director}';`;
};

export const selectGenre = (genre: string): string => {
  return `SELECT genre, id FROM genres WHERE genre = '${genre}';`;
};

export const selectProductionCompany = (company: string): string => {
  return `SELECT company_name, id FROM production_companies
   WHERE company_name = '${company}';`;
};

export const selectMovieById = (id: number): string => {
  return `SELECT * FROM movies WHERE id = ${id};`;
};

export const selectGenreById = (id: number): string => {
  return `SELECT * FROM genres WHERE id = ${id};`;
};

export const selectDirectorById = (id: number): string => {
  return `SELECT * FROM directors WHERE id = ${id};`;
};

export const selectActorById = (id: number): string => {
  return `SELECT * FROM actors WHERE id = ${id};`;
};

export const selectKeywordById = (id: number): string => {
  return `SELECT * FROM keywords WHERE id = ${id};`;
};

export const selectProductionCompanyById = (id: number): string => {
  return `SELECT * FROM production_companies WHERE id = ${id};`;
};

export const selectMovie = (imdbId: string): string => {
  return `SELECT original_title, id FROM MOVIES WHERE imdb_id = '${imdbId}';`;
};

export const selectMovieId = (imdbId: string): string => {
  return `SELECT id FROM MOVIES WHERE imdb_id = '${imdbId}';`;
};

export const selectRatingsByUserID = (userId: number): string => {
  return`SELECT user_id, rating, time_created FROM MOVIE_RATINGS WHERE user_id = '${userId}'`
};

export const selectGenresByMovieId = (movieId: number): string => {
  return `SELECT g.genre FROM movie_genres mg JOIN genres g ON
    g.id = mg.genre_id WHERE mg.movie_id = ${movieId}`;
};

export const selectActorsByMovieId = (movieId: number): string => {
  return `SELECT a.full_name FROM movie_actors ma JOIN actors a ON 
  a.id = ma.actor_id WHERE ma.movie_id = ${movieId}`;
};

export const selectDirectorsByMovieId = (movieId: number): string => {
  return `SELECT d.full_name FROM movie_directors md JOIN directors d ON 
  d.id = md.director_id WHERE md.movie_id = ${movieId}`;
};

export const selectKeywordsByMovieId = (movieId: number): string => {
  return `SELECT k.keyword FROM movie_keywords mk JOIN keywords k 
  ON k.id = mk.keyword_id WHERE mk.movie_id = ${movieId}`;
};

export const selectProductionCompaniesByMovieId = (movieId: number): string => {
  return `SELECT pc.company_name FROM movie_production_companies mpc JOIN
   production_companies pc ON pc.id = mpc.company_id WHERE mpc.movie_id = ${movieId}`;
};

export const selectCount = (table: string): string => {
  return `SELECT COUNT(*) AS c FROM ${table};`;
};
