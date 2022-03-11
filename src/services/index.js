import axios from 'axios';
import config from 'config';

const apiSpotify = axios.create({
  baseURL: config.apiSpotify,
});

const api = axios.create({
  baseURL: config.api,
});

export { apiSpotify, api };
