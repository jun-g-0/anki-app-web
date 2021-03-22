const config = require('./knexfile.js');
const knex = require('knex')(config);
const parse = require('pg-connection-string').parse;

let pgconfig = null;
if (process.env.DATABASE_URL) {
  pgconfig = parse(process.env.DATABASE_URL);
  pgconfig.ssl = { rejectUnauthorized: false };
}

const db = knex({
  connection: pgconfig || `postgres://${process.env.USER}@127.0.0.1:5432/anki`,
  searchPath: 'public',
});
module.exports = db;
