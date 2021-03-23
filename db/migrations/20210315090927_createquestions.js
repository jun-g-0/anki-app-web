exports.up = async function (knex) {
  await knex.schema.createTable('questions', (t) => {
    t.increments();
    t.string('question', 2000).notNull();
    t.string('desc', 2000);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('questions');
};
