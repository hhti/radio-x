import axios from 'axios';
import config from 'config';

const apiSpotify = axios.create({
  baseURL: config.apiSpotify,
});

export { apiSpotify };
