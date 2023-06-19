const elasticClient = require("../elasticSearch/elastic.client");
const db = require("../models");
const Todo = db.todos;

exports.create = async (req, res) => {
  if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
      const document={
        title: req.body.title,
        description: req.body.description
      }
     const results= await Todo.create(document);
     await elasticClient.index({
      index: "todo",
      document
    
  });
  res.send(results);   
};


exports.findAll = async (req, res) => {

  Todo.findAll().then(data=>{
  res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving todos."
    });
  });;
  
};



exports.findTodo = async (req, res) => {
  const title = req.params.title;
  const body = await elasticClient.search({
    index: 'todo',
    body: {
      query: {
        match: { "title": title }
      }
    }
  });
  const result =body.hits.hits.map(data=>{return data._source})
   res.send(result)
}



exports.deleteTodo=(req,res)=>{
  const id = req.params.id;

  Todo.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Todo was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Todo with id=${id}. Maybe Todo was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Todo with id=" + id
      });
    });
}

