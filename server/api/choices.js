const { ContactSupportOutlined } = require('@material-ui/icons');
const db = require('../../db/knex.js');

/**************************************************
 * choice section                                 *
 **************************************************/
module.exports = function addChoicesApi(app) {
  app.get('/api/v1/choices', async (req, res) => {
    const result = await db.select().from('choices');
    res.json(result);
  });

  app.get('/api/v1/choices/:qid', async (req, res) => {
    if (!Number.isInteger(+req.params.qid)) {
      res.status(400).end();
      return;
    }

    console.log(req.params);
    console.log(req.params.qid);
    const result = await db
      .table('choices')
      .where('question_id', +req.params.qid);
    console.log(result);
    res.status(200).json(result).end();
  });

  app.post('/api/v1/choices/', async (req, res) => {
    if (
      !(
        req.body &&
        req.body.hasOwnProperty('choice') &&
        req.body.hasOwnProperty('question_id') &&
        req.body.hasOwnProperty('is_correct')
      )
    ) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await db.table('choices').insert({
      choice: req.body.choice,
      question_id: req.body.question_id,
      is_correct: req.body.is_correct,
    });
    res.status(201).end();
  });

  app.put('/api/v1/choices/:id', async (req, res) => {
    if (!Number.isInteger(+req.params.id)) {
      res.status(400).end();
      return;
    }

    if (
      !(
        req.body &&
        (req.body.hasOwnProperty('choice') ||
          req.body.hasOwnProperty('question_id') ||
          req.body.hasOwnProperty('is_correct'))
      )
    ) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    if (req.body.hasOwnProperty('choice')) {
      const resultChoice = await db
        .table('choices')
        .where('id', +req.params.id)
        .update({
          choice: req.body.choice,
        });
    }
    if (req.body.hasOwnProperty('question_id')) {
      const resultQuestionId = await db
        .table('choices')
        .where('id', +req.params.id)
        .update({
          question_id: req.body.question_id,
        });
    }
    if (req.body.hasOwnProperty('is_correct')) {
      const resultIs_correct = await db
        .table('is_corrects')
        .where('id', +req.params.id)
        .update({
          is_correct: req.body.is_correct,
        });
    }
    res.status(201).end();
  });

  app.delete('/api/v1/choices/:id', async (req, res) => {
    if (!Number.isInteger(+req.params.id)) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await db
      .table('choices')
      .where('id', +req.params.id)
      .del();

    res.status(200).end();
  });

  return app;
};
