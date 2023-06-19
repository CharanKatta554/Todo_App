module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("todos", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Todo;
  };