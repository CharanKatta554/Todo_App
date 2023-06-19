import React from 'react';
import CreateTodo from './createTodo';
import TodoList from './todoList';

class TodoComponent extends React.Component {
    constructor(props){
        super(props)
        this.state={todoList:[]}
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentDidMount(){
        fetch("http://localhost:8080/api/todo/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({todoList: data})})
  }

  onCreate(todo) {
    let newList = this.state.todoList;
    newList.push(todo);
    this.setState({todoList: newList});
  }

  onDelete(id) {
   const newList = this.state.todoList.filter(todo => todo.id !== id);
   this.setState({todoList: newList});
  }
    
    render(){
        return(
            <div>
              <CreateTodo onCreate={this.onCreate}/>
              <TodoList todos={this.state.todoList} onDelete={this.onDelete}/>
            </div>
        )
    }
}

export default TodoComponent;