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
          choice:
            'インターネットを介して遠隔地に設置した3Dプリンタへ設計データを送り，短時間に複製物を製作すること',
          question_id: 3,
          is_correct: false,
        },
        {
          choice:
            'システムを正副の二重に用意し，災害や故障時にシステムの稼働の継続を保証すること',
          question_id: 3,
          is_correct: false,
        },
        {
          choice:
            '自宅の家電機器とインターネットでつながり，稼働監視や操作を遠隔で行うことができるウェアラブルデバイスのこと',
          question_id: 3,
          is_correct: false,
        },
        {
          choice:
            'ディジタル空間に現実世界と同等な世界を，様々なセンサで収集したデータを用いて構築し，現実世界では実施できないようなシミュレーションを行うこと',
          question_id: 3,
          is_correct: true,
        },
      ]);
    });
};
