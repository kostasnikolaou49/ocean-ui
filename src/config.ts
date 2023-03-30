const REACT_APP_SUPERDEV_PROTOCOL = process.env.REACT_APP_SUPERDEV_PROTOCOL || 'http';
const REACT_APP_SUPERDEV_DOMAIN = process.env.REACT_APP_SUPERDEV_DOMAIN || 'localhost';
const REACT_APP_SUPERDEV_PORT = process.env.REACT_APP_SUPERDEV_PORT || 5000;

export const baseURL =
  REACT_APP_SUPERDEV_PROTOCOL + '://' + REACT_APP_SUPERDEV_DOMAIN + ':' + REACT_APP_SUPERDEV_PORT + '/api';

export const SUPERDEV_TOKEN_NAME = 'superdev_token';
export const SUPERDEV_EMAIL = 'superdev_email';
