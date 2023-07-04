// Backend Url's
export const BACKEND_URL = 'http://127.0.0.1:8000/'
export const PAGINATED_SONG_URL = (page: number) => BACKEND_URL + 'songs/' + page;

// Web Url's
export const WEB_UPLOAD_SONG_URL = '/upload';
export const WEB_AUTH_SIGNUP_URL = '/auth/signup';
export const WEB_AUTH_LOGIN_URL = '/auth/login';
export const WEB_USER_PROFILE_URL = (id: number) => '/users/' + id;