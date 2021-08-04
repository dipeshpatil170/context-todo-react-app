import React, { Component } from 'react'
import { TodoContext } from '../contexts/TodoContext';
import Todo from './Todo';

export default class TodosList extends Component {
    static contextType = TodoContext;
    render() {
        const { todos } = this.context;
        return (
            <>
                <table className="table table-responsive-md w-50  text-center table-hover">
                    <thead>
                        <tr>
                            <th >TASK ID</th>
                            <th >TASK</th>
                            <th colSpan="2">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.length > 0 && (
                            todos.map((todo, index) => {
                                return (
                                    <Todo key={index} todo={todo}/>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </>
        )
    }
}
