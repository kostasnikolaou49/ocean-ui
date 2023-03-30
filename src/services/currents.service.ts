import { $api } from './api';

export function getCurrents() {
  return $api.get('/currents');
}
