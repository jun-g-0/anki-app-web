const config = require('./knexfile.js');
const knex = require('knex');

const parse = require('pg-connection-string').parse;

let pgconfig = null;
console.log(`pgconfig: `, pgconfig);
if (process.env.DATABASE_URL) {
  pgconfig = parse(process.env.DATABASE_URL);
  pgconfig.ssl = { rejectUnauthorized: false };
}

console.log(`selected connection:`);
console.log(pgconfig || `postgres://${process.env.USER}@127.0.0.1:5432/dbanki`);

const db = knex({
  client: 'pg',
  connection:
    pgconfig || `postgres://${process.env.USER}@127.0.0.1:5432/dbanki`,
  searchPath: ['db', 'public', 'knex'],
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
});
module.exports = db;
