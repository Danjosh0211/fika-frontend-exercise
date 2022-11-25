import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://api.themoviedb.org/3",
});

// surprised this is in the query params but ok.
const apikey = 'd432b933ecc6d5642d8d2befbc40c7ac';
//lets keep a default of en.
const language = 'en-US';
const defaults = {api_key: apikey, language: language};
export const getGenres = () => apiClient.get('/genre/movie/list', {...defaults});
export const discoverMovies = ({include_adult, page}) => apiClient.get('/discover/movie', {...defaults, include_adult: include_adult, page: page});
export const searchMovies = ({
    query, 
    page, 
    include_adult, 
    year
  }) => apiClient.get('/search/movie', {
    ...defaults,
    query: query.length > 0 ? query : null,
    page: page,
    include_adult: include_adult
});

export default {
  getGenres,
  discoverMovies,
  searchMovies
};
