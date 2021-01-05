import React, { Component } from 'react';
import TodoItem from '../TodoItem/TodoItem.js';
export default class TodoList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {items,clearList,handleDelete,handleEdit}=this.props;
         return(
            <ul className="list-group my-5">
            <h3 className="text-capitalize text-center">Todo List</h3>
            {
                items.map((item,index)=>{
                    return(
                        <TodoItem key={index}
                        title={item.task}
                        handleDelete={()=> handleDelete(index)}
                        handleEdit={()=> handleEdit(item._id,index)}                        
                        />
                    )
                })
            }
        
            <button type="button" className="btn btn-danger btn-block text-capitalize mt-3"
            onClick={clearList}
            >
                Clear List
            </button>
            </ul>
        );
    }
}