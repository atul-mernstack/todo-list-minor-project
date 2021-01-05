import React from 'react';
import TodoList from '../TodoList/TodoList.js';
import TodoInput from '../TodoInput/TodoInput.js';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      id:'',
      item:'',
      editItem:false,
      index:'',
    }
    
    
  }

  clearList=()=> {
    fetch("https://todo-web--app-backend.herokuapp.com/todo",{
			method:"DELETE"
		}).then(r=>{
      this.setState({
        items:[]
      });
		})
  }

 

  handleDelete=(itemIdx)=>{
   
    const idTodelete=this.state.items[itemIdx]._id;
		fetch(`https://todo-web--app-backend.herokuapp.com/todo/${idTodelete}`,{
			method:"DELETE"
		}).then(r=>{
      this.state.items.splice(itemIdx, 1);
      this.setState({
        items:[...this.state.items]
      });
		})
  }

  handleChange=(e)=> {
    this.setState({
      item:e.target.value
    });
  };

  handleAdd=(e)=>{
    e.preventDefault();
    fetch("https://todo-web--app-backend.herokuapp.com/todo",{
			method:"POST",
			body:JSON.stringify({task:this.state.item}),
			headers:{
				"Content-Type":"application/json",
			},
		})
		.then(res=>res.json())
		.then((res)=>{
      const updateItems=[...this.state.items,res];
      this.setState({
        items:updateItems,
        item:'',
        id:new Date().valueOf(),
        editItem:false
      });
		});
  };

  componentDidMount(){
    fetch("https://todo-web--app-backend.herokuapp.com/todo",{
			headers:{'Content-Type':'application/json'}
		})
		.then((r)=>r.json())
		.then(arr=>{
			this.setState({
        items:arr,
        item:'',
      });
		});
  };

  handleEdit=(id,indx)=>{
     const selectedItem=this.state.items[indx].task;
     
     this.setState({
       item:selectedItem,
       editItem:true,
       id:id,
       index:indx
     });
     
  };

  handleEdited=(e)=>{
    e.preventDefault();
    const idToUpdate=this.state.id;
    const index=this.state.index;
    fetch(`https://todo-web--app-backend.herokuapp.com/todo/${idToUpdate}`,{
      method:"PUT",
      body:JSON.stringify({task:this.state.item}),
      headers:{
        "Content-Type":"application/json",
     },
    })
   .then(r=>r.json())
   .then(res=>{
     const editedItem=this.state.items;
     editedItem[index]=res;
     this.setState({
       items:editedItem,
       item:'',
       editItem:false,
       id:'',
       index:''
     })
  
      });
   
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">Todo Input</h3>
            <TodoInput item={this.state.item}
            handleChange={this.handleChange} 
            handleAdd={this.handleAdd}
            handleEdited={this.handleEdited}
            editItem={this.state.editItem}
            />
            <TodoList items={this.state.items}
            clearList={this.clearList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}           
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
