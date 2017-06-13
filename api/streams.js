const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req, res, next){
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid ID'));
}

function validStream(stream){
  const hasTitle = typeof stream.title == 'string' && stream.title.trim() != '';
  const hasURL = typeof stream.url == 'string' && stream.url.trim() != '';
  const hasFOLLWERS = !isNaN(stream.follwers) ;

  return hasTitle && hasURL && hasFOLLWERS;
}

router.get('/', (req, res) => {
  queries.getAll().then(streams => {
    res.json(streams);
  });
});

router.get('/:id',isValidId, (req, res) => {
  queries.getOne(req.params.id).then(streams => {
    res.json(streams);
  })
})

router.post('/', (req, res, next) => {
  if(validStream(req.body)) {
    // insert into db
    queries.create(req.body).then(streams => {
      res.json(streams[0]);
    });
  } else {
    next(new Error('Invalid stream'));
  }
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validStream(req.body)){
    //update stream
    queries.update(req.params.id, req.body).then(streams => {
      res.json(streams[0])
    })
  } else {
    next(new Error('Invalid stream'));
  }
});

router.delete('/:id', isValidId, (req, res) => {
    queries.delete(req.params.id).then(() => {
      res.json({
        deleted:true
      })
    })
});

module.exports = router;
