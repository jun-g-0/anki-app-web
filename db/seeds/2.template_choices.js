exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('choices')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('choices').insert([
        { choice: 'IP-VPN', question_id: 1, is_correct: false },
        { choice: 'インターネットVPN', question_id: 1, is_correct: false },
        {
          choice: 'レイテンシールーティング',
          question_id: 1,
          is_correct: false,
        },
        {
          choice: '広域イーサネット',
          question_id: 1,
          is_correct: true,
        },
        {
          choice: '①，③，②',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: '②，①，③',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: '③，①，②',
          question_id: 2,
          is_correct: true,
        },
        {
          choice: '③，②，①',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: 'Choice1',
          question_id: 3,
          is_correct: false,
        },
        {
          choice: 'Choice2',
          question_id: 3,
          is_correct: false,
        },
        {
          choice: 'Choice3',
          question_id: 3,
          is_correct: false,
        },
        {
          choice: 'Choice4(Correct)',
          question_id: 3,
          is_correct: true,
        },
      ]);
    });
};
