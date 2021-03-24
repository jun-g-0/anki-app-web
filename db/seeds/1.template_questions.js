exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('questions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          id: 1,
          question: `質問1の問題文です。`,
          desc: `質問1の解説です。`,
        },
        {
          id: 2,
          question: `質問2の問題文です。
          長文で改行が含まれています。
          1.とても長い文章
          2.とても長い文章
          3.とても長い文章`,
          desc: `質問2の解説です。
          解説も長文で改行が含まれています。
          1.とても長い文章
          2.とても長い文章
          3.とても長い文章`,
        },
        {
          id: 3,
          question: `質問3の問題文です。選択式ではなく、書き込み式です。`,
          desc: `質問1の解説です。`,
        },
      ]);
    });
};
