const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include:{
     model:Product,
     attributes:['id','product_name','price','stock','category_id'] 
    }
  }).then(tagData => res.json(tagData))
  .catch(err=>{
    console.log(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where:req.params.id,
    // be sure to include its associated Product data
    include:{
      model:Product,
      attributes:['id','product_name','price','stock','category_id'] 
     }
  }).then(tagData => {
    if(!tagData){
      res.status(404).json({
        alert:"id not found",
      })
      return res.json(tagData);
    }});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData))
  .catch(err=>{
    console.log(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id:req.params.id
    }
  }).then(tagData => res.json(tagData))
  .catch(err=>{
    console.log(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(tagData => {
    if(!tagData){
      res.status(404).json({
        alert:"id not found",
      }).catch (err =>{console.log(err);})
      return res.json(tagData);
    }});
});

module.exports = router;