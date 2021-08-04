
import React, { Component, createContext } from 'react';

export const TodoContext = createContext();

export default class TodoContextProvider extends Component {
    constructor(props) {
        super(props)
        this.addTask = this.addTask.bind(this)
        this.editTask = this.editTask.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.resetSuccessValues = this.resetSuccessValues.bind(this)
        this.state = {
            todos: [],
            isCreateSuccess:false,
            isUpdateSuccess:false,
            isDeleteSuccess:false,
        }
    }
    resetSuccessValues() {
        this.setState({ isCreateSuccess: false, isUpdateSuccess: false, isDeleteSuccess: false });
    }
   
    async componentDidMount() {
        await fetch('http://localhost:3001/todos')
            .then((res => res.json()))
            .then((response) => {
                this.setState({ ...this.state, todos: response });
            }).catch(function (error) {
                console.log('Error : ', error);
            });
    }
    render() {
        return (
            <TodoContext.Provider value={
                {
                    ...this.state,
                    addTask: this.addTask,
                    editTask: this.editTask,
                    deleteTask: this.deleteTask,
                    resetSuccessValues: this.resetSuccessValues
                }
            }>
                {this.props.children}
            </TodoContext.Provider>
        )
    }

    addTask(data) {
        const { name, description } = data;
        fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ ...this.state, todos: this.state.todos.concat(response),isCreateSuccess:true});
            },
                (error) => {
                    console.warn(error);
                })
    }
    editTask(data) {
        const { id, name, description } = data;
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, description: description })
        })
            .then(res => res.json())
            .then(response => {
                this.setState({ ...this.state, todos: this.state.todos.map(todo => todo.id === response.id ? response : todo) ,isUpdateSuccess:true});
            },
                (error) => {
                    console.warn(error);
                })
    }
    deleteTask(id) {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((response) => {
                this.setState({ ...this.state, todos: this.state.todos.filter(todo => todo.id !== id) ,isDeleteSuccess:true});
            },
                (error) => {
                    console.warn(error);
                })
    }
}
