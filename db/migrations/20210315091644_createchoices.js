exports.up = async function (knex) {
  await knex.schema.createTable('choices', (t) => {
    t.increments();
    t.string('choice', 2000).notNull();
    t.integer('question_id')
      .notNull()
      .references('id')
      .inTable('questions')
      .onDelete('CASCADE');
    t.boolean('is_correct').notNull();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('choices');
};
