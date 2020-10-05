const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const name = isDev ? 'development' : 'production';

module.exports = {
  isDev,
  isProd,
  name
};
