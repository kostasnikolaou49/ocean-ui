import axios from 'axios';
import { apiUrl } from '../constants/constants';

/**
 * @axios instance for better handling API requests
 */

export const $api = axios.create({
  baseURL: apiUrl,
});
