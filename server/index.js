const env = process.env.NODE_ENV || 'development';
const knex = require('knex')(config[env]);
const db = require('./knex');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const setupServer = () => {
  /**************************************************
   * question section                               *
   **************************************************/
  app.get('/api/v1/questions', async (req, res) => {
    const result = await knex.select().from('questions');
    console.log(result);
    res.json(result);
  });

  app.get('/api/v1/questions/:id', async (req, res) => {
    if (!Number.isInteger(+req.params.id)) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await knex('questions').where('id', +req.params.id);
    res.status(200).json(result).end();
  });

  app.post('/api/v1/questions/', async (req, res) => {
    console.log(req.body);
    if (!(req.body && req.body.hasOwnProperty('question'))) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await knex('questions').insert({
      question: req.body.question,
    });
    res.status(201).end();
  });

  app.put('/api/v1/questions/:id', async (req, res) => {
    if (!Number.isInteger(+req.params.id)) {
      res.status(400).end();
      return;
    }

    if (!(req.body && req.body.hasOwnProperty('question'))) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await knex('questions')
      .where('id', +req.params.id)
      .update({
        question: req.body.question,
      });
    res.status(201).end();
  });

  app.delete('/api/v1/questions/:id', async (req, res) => {
    if (!Number.isInteger(+req.params.id)) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await knex('questions')
      .where('id', +req.params.id)
      .del();

    res.status(200).end();
  });

  /**************************************************
   * choice section                                 *
   **************************************************/
  app.get('/api/v1/choices', async (req, res) => {
    const result = await knex.select().from('choices');
    res.json(result);
  });

  app.get('/api/v1/choices/:qid', async (req, res) => {
    if (!Number.isInteger(+req.params.qid)) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await knex('choices').where('question_id', +req.params.qid);
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
    const result = await knex('choices').insert({
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
      const resultChoice = await knex('choices')
        .where('id', +req.params.id)
        .update({
          choice: req.body.choice,
        });
    }
    if (req.body.hasOwnProperty('question_id')) {
      const resultQuestionId = await knex('choices')
        .where('id', +req.params.id)
        .update({
          question_id: req.body.question_id,
        });
    }
    if (req.body.hasOwnProperty('is_correct')) {
      const resultIs_correct = await knex('is_corrects')
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
    const result = await knex('choices')
      .where('id', +req.params.id)
      .del();

    res.status(200).end();
  });

  return app;
};

const server = setupServer();
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log('Server listening on Port', PORT);
});
