import axios from 'axios';
import config from 'config';

const backendLocal = axios.create({
  baseURL: config.pathBaseUrl
});

const backendRemoto = axios.create({
  baseURL: config.pathApiRelatorioUrl
});

const allureApi = axios.create({
  baseURL: config.pathAllureServer
});

export { backendLocal, backendRemoto, allureApi, axios as defaultAxios };
