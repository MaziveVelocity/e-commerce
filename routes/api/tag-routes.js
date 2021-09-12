const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id','tag_name'],
    include: [
      {
      model: Product,
      attributes: ['id','product_name','price', 'stock','category_id']
    }
  ]
  }).then(dbData => {
    res.status(200).json(dbData);
  }).catch(err => {
    res.status(500).json({error: err, message: 'failed to find all data'});
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id','tag_name'],
    include: [
      {
      model: Product,
      attributes: ['id', 'product_name','price', 'stock', 'category_id']
    }
  ]
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
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbData => {
    res.status(200).json({message: 'creation successful', data: dbData});
  }).catch(err => {
    res.status(500).json({error: err, message: 'failed to created data'});
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
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
  // delete on tag by its `id` value
  Tag.destroy({
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
