import React from 'react';

class CreateTodo extends React.Component {
    constructor(props){
        super(props);
        this.state={title:"",description:""};
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({[event.target.name]:event.target.value }) 
        
    }
    handleSubmit=async(e)=>{
        e.preventDefault()
      const data = await fetch('http://localhost:8080/api/todo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({title: this.state.title,description: this.state.description})
            }).then((response) =>   {
                console.log(response)
                return response.json()
                });
                
            this.props.onCreate({id:data.id, title: this.state.title,description: this.state.description});
   
    }
	render() {
        
		return (
            
			<div>
                
                <form onSubmit={this.handleSubmit}>
                    <h5>TODO</h5>
                    <label>Enter title</label>
                    <input type="text" name="title" onChange={this.handleChange}/><br/>
                    <label>Enter description</label>
                    <input type="text" name="description" onChange={this.handleChange}/><br/>
                    <input type="submit"/>
                </form>
			</div>
		);
	}
}
export default CreateTodo;