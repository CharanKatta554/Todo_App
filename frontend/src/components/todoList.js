import React from 'react';
// import '../css/todoList';
const TodoList = ({todos, onDelete}) =>{ 
    const handleDelete=(id)=>{
        fetch('http://localhost:8080/api/todo/'+id,{
            method:'delete'}).then((res)=>{
                onDelete(id);
             })
            .catch(
                err=>{
                    console.log(err)})
    }
    return(
    <><div>
        
        <table id="todos">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((todo,index)=>{
                    return <tr key={index}>
                        <td>{todo.id}</td>
                        <td>{todo.title}</td>
                        <td>{todo.description}</td>
                        <td><button onClick={()=> handleDelete(todo.id)}>delete</button></td>
                    </tr>
                })}
            </tbody>
        </table>
      </div>
    </>
        );
}
export default TodoList;
