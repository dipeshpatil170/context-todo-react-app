import React, { Component } from 'react'
import { TodoContext } from '../contexts/TodoContext';

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditable: false,
            id: 0,
            name: '',
            description:''
        }
    }
    static contextType = TodoContext;

    onEdit(id, name, description) {
        this.setState({ id: id, name: name, description: description, isEditable:!this.state.isEditable})
    }
    onUpdate() {
        const newTask = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        }
        this.context.editTask(newTask);
        this.setState({ isEditable: !this.state.isEditable });
        setTimeout(() => {
            this.context.resetSuccessValues();
        }, 1000);
    }
    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    handleDelete(id) {
        this.context.deleteTask(id);
        setTimeout(() => {
            this.context.resetSuccessValues();
        }, 1000);
    }
    render() {
        const { todo } = this.props;
        return (
            this.state.isEditable ? <tr>
                <td>TASK-ID:{todo.id}</td>
                <td><input type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleChange(e) }/></td>
                <td><input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description:e.target.value}) }/></td>
                <td><i className="bi bi-check-lg text-success" onClick={() => this.onUpdate()}></i></td>
                <td><i className="bi bi-x-circle" onClick={() => this.setState({ isEditable: !this.state.isEditable })}></i></td>
            </tr> :
                <tr>
                    <td>TASK-ID:{todo.id}</td>
                    <td>{todo.name}</td>
                    <td>{todo.description}</td>
                    <td><i onClick={() => this.onEdit(todo.id, todo.name, todo.description)} className="bi bi-pencil-square text-dark"></i></td>
                    <td><i className="bi bi-trash text-danger" onClick={() => { if (window.confirm('Are you sure ? you wish to delete this item?')) this.handleDelete(todo.id) }}></i></td>
                </tr>
        )
           
    }
}
