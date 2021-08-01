exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('questions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          questionId: 1,
          questionText: `質問1の問題文です。`,
          type: 'radio',
          choices: [
            { choiceId: 1, choiceText: '質問1-選択肢1' },
            { choiceId: 2, choiceText: '質問1-選択肢2' },
            { choiceId: 3, choiceText: '質問1-選択肢3' },
            { choiceId: 4, choiceText: '質問1-選択肢4' },
          ],
          answer: 2,
          desc: `質問1の解説です。`,
        },
        {
          questionId: 2,
          questionText: `質問2の問題文です。
\n長文で改行が含まれています。
\n1.とても長い文章
\n2.とても長い文章
\n3.とても長い文章`,
          type: 'radio',
          choices: [
            { choiceId: 1, choiceText: '質問2-選択肢1' },
            { choiceId: 2, choiceText: '質問2-選択肢2' },
            { choiceId: 3, choiceText: '質問2-選択肢3' },
          ],
          answer: 2,
          desc: `質問2の解説です。
\n解説も長文で改行が含まれています。
\n1.とても長い文章
\n2.とても長い文章
\n3.とても長い文章`,
        },
        {
          questionId: 3,
          questionText: `質問3の問題文です。`,
          type: 'radio',
          choices: [
            { choiceId: 1, choiceText: '質問3-選択肢1' },
            { choiceId: 2, choiceText: '質問3-選択肢2' },
            { choiceId: 3, choiceText: '質問3-選択肢3' },
          ],
          answer: 1,
          desc: `質問3の解説です。`,
        },
      ]);
    });
};
