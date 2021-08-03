import React, { Component } from 'react'
import { TodoContext } from '../contexts/TodoContext';

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEditable: false,
            id: 0,
            name: '',
        }
    }
    static contextType = TodoContext;

    onEdit(id, name) {
        this.setState({ id: id, name: name, isEditable:!this.state.isEditable})
    }
    onUpdate() {
        this.context.editTask(this.state.id, this.state.name);
        this.setState({ isEditable: !this.state.isEditable });
        setTimeout(() => {
            this.context.resetSuccessValues();
        }, 2000);
    }
    handleChange(e) {
        this.setState({ name: e.target.value });
    }
    handleDelete(id) {
        this.context.deleteTask(id);
        setTimeout(() => {
            this.context.resetSuccessValues();
        }, 2000);
    }
    render() {
        const { todo } = this.props;
        return (
            this.state.isEditable ? <tr>
                <td>{todo.id}</td>
                <td><input type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleChange(e) }/></td>
                <td><i className="bi bi-check-lg text-success" onClick={() => this.onUpdate()}></i></td>
                <td><i className="bi bi-x-circle" onClick={() => this.setState({ isEditable: !this.state.isEditable })}></i></td>
            </tr> :
                <tr>
                    <td>{todo.id}</td>
                    <td>{todo.name}</td>
                    <td><i onClick={() => this.onEdit(todo.id, todo.name)} className="bi bi-pencil-square text-dark"></i></td>
                    <td><i className="bi bi-trash text-danger" onClick={() => this.handleDelete(todo.id)}></i></td>
                </tr>
        )
           
    }
}
