const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';
//process.env.NODE_ENV only exists when we are running jest

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool();
