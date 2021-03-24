const db = require('../../db/knex.js');

/**************************************************
 * question section                               *
 **************************************************/
module.exports = function addQuestionsApi(app) {
  // Get questions
  app.get('/api/v1/questions', async (req, res) => {
    try {
      const locations = await db.select().table('questions');
      res.json(locations);
    } catch (err) {
      console.error('Error loading questions!', err);
      res.sendStatus(500);
    }
  });

  app.get('/api/v1/questions/:id', async (req, res) => {
    if (!Number.isInteger(+req.params.id)) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await db.table('questions').where('id', +req.params.id);
    res.status(200).json(result).end();
  });

  app.post('/api/v1/questions/', async (req, res) => {
    console.log(req.body);
    if (!(req.body && req.body.hasOwnProperty('question'))) {
      res.status(400).end();
      return;
    }

    // no error handling yet
    const result = await db.table('questions').insert({
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
    const result = await db
      .table('questions')
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
    const result = await db
      .table('questions')
      .where('id', +req.params.id)
      .del();

    res.status(200).end();
  });

  return app;
};
