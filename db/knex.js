const knex = require('knex');
const parse = require('pg-connection-string').parse;

let pgconfig = null;
if (process.env.DATABASE_URL) {
  pgconfig = parse(process.env.DATABASE_URL);
  pgconfig.ssl = { rejectUnauthorized: false };
}

console.log(
  `Selected db connection:`,
  pgconfig || `postgres://${process.env.USER}@127.0.0.1:5432/dbanki`
);

const db = knex({
  client: 'pg',
  connection:
    pgconfig || `postgres://${process.env.USER}@127.0.0.1:5432/dbanki`,
  searchPath: ['public', 'db', 'knex'],
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
});
module.exports = db;
