exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('questions')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('questions').insert([
        {
          id: 1,
          question: `インターネット接続において，複数のISPの回線を使用した冗長化構成を表す用語はどれか。`,
        },
        {
          id: 2,
          question: `Webサーバ，アプリケーション(AP)サーバ及びデータベース(DB)サーバが各1台で構成されるWebシステムにおいて，次の3種類のタイムアウトを設定した。タイムアウトに設定する時間の長い順に並べたものはどれか。ここで，トランザクションはWebリクエスト内で処理を完了するものとする。

          〔タイムアウトの種類〕
          1.APサーバのAPが，処理を開始してから終了するまで
          2.APサーバのAPにおいて，DBアクセスなどのトランザクションを開始してから終了するまで
          3.Webサーバが，APサーバにリクエストを送信してから返信を受けるまで`,
        },
        { id: 3, question: `IoT活用におけるディジタルツインの説明はどれか。` },
      ]);
    });
};
