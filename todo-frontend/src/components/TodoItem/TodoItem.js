import React, { Component } from 'react';

export default class TodoItem extends Component{
    
    render(){
        const {title,handleDelete,handleEdit}=this.props;
        return(
            <li className="list-group-item text-capitalize d-flex justify-content-between my-2">
            <h6>{title}</h6>
            
            <div className="todo-icon">
            {/* <span>{!editItem?<i className="fa fa-check-circle ml-1" style={{color:"green", alignItems:"end"}} aria-hidden="true"></i>
            :<i className="fa fa-times-circle ml-1" disabled="true" style={{color:"red"}} aria-hidden="true"></i>}</span> */}
                <span className="mx-2 text-success"
                onClick={handleEdit}>
                <i className="fa fa-edit"/>
                </span>
                <span className="mx-2 text-danger"
                onClick={handleDelete}>
                    <i className="fa fa-trash"/>
                </span>
            </div>
            </li>
        )
    }
}