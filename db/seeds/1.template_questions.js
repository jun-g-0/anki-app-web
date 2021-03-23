exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('questions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          id: 1,
          question: `ques1`,
        },
        {
          id: 2,
          question: `ques2`,
        },
        {
          id: 3,
          question: `ques3`,
        },
      ]);
    });
};
