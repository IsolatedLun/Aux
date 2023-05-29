export const BACKEND_URL = 'http://127.0.0.1:8000/'
export const PAGINATED_SONG_URL = (page: number) => BACKEND_URL + 'songs/' + page;