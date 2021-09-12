const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: ['id', 'category_name'],
  }).then(dbData => {
    res.status(200).json(dbData);
  }).catch(err => {
    res.status(500).json({error: err, message: 'failed to find all data'});
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
  }).then(dbData => {
    if(!dbData){
      res.status(404).json({message: 'No item by that ID'});
      return;
    }
    res.status(200).json(dbData);
  }).catch(err => {
    res.status(500).json({error: err, message: 'failed to find selected data'});
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(dbData => {
    res.status(200).json({message: 'creation successful', data: dbData});
  }).catch(err => {
    res.status(500).json({error: err, message: 'failed to created data'});
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body,{
    where: {
      id: req.params.id
    },
  }).then(dbData => {
    if(dbData[0] === 0){
      res.status(404).json({message: 'No item by that ID'});
      return;
    }
    res.status(200).json({message: 'update successful', data: dbData});
  }).catch(err =>{
    res.status(500).json({error: err, message: 'failed to update data'});
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if(!dbData){
      res.status(404).json({message: 'No item by that ID'});
      return;
    }
    res.status(200).json({message: 'deletion successful', data: dbData});
  }).catch(err => {
    res.status(500).json({error: err, message: 'failed to delete data'});
  });
});

module.exports = router;
