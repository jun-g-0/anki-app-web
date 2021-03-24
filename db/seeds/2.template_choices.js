exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('choices')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('choices').insert([
        { choice: '質問1-選択肢1', question_id: 1, is_correct: false },
        { choice: '質問1-選択肢2', question_id: 1, is_correct: false },
        {
          choice: '質問1-選択肢3',
          question_id: 1,
          is_correct: false,
        },
        {
          choice: '質問1-選択肢4(正答)',
          question_id: 1,
          is_correct: true,
        },
        {
          choice: '質問2-選択肢1',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: '質問2-選択肢2',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: '質問2-選択肢3(正答)',
          question_id: 2,
          is_correct: true,
        },
        {
          choice: '質問2-選択肢4',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: '質問2-選択肢5',
          question_id: 2,
          is_correct: false,
        },
        {
          choice: '質問3-選択肢1',
          question_id: 3,
          is_correct: false,
        },
        {
          choice: '質問3-選択肢2',
          question_id: 3,
          is_correct: false,
        },
        {
          choice: '質問3-選択肢3',
          question_id: 3,
          is_correct: false,
        },
        {
          choice: '質問3-選択肢4(Correct)',
          question_id: 3,
          is_correct: true,
        },
      ]);
    });
};
