exports.up = async function (knex) {
  await knex.schema.createTable('questions', (t) => {
    t.increments();
    t.string('question', 2000).notNull();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('questions');
};
