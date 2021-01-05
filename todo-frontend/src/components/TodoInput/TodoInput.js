import React, { Component } from 'react';

export default class TodoInput extends Component {
    render() {
        const { item, handleChange, handleAdd, handleEdited, editItem} = this.props;
        return (
            <div className="card card-body my-3">
                <form >
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text bg-primary text-center">
                                <i className="fa fa-book" />
                            </div>
                        </div>
                        <input type="text" className="form-control text-capitalize" placeholder="add a todo item"
                            value={item}
                            onChange={handleChange} />
                    </div>
                        {!editItem?<button type="btn" className="btn btn-block btn-primary mt-3" disabled={item.trim().length===0} onClick={handleAdd}>Add Item</button>
                        :<button type="btn" className="btn btn-block btn-success mt-3" disabled={item.trim().length===0} onClick={handleEdited}>Edit Item</button>}
                                
                </form>
            </div>
        )
    }
}