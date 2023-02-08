import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost/cart-project-php-api/api/v1/',
    timeout: 1000,
    headers: {}
  });