import React, { Component } from 'react'
import { TodoContext } from '../contexts/TodoContext';

export default class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
        }
    }
    static contextType = TodoContext;

    handleChange(e) {
        this.setState({ task: e.target.value })
    }

    handleSubmit(e) {
        this.context.addTask(this.state.task);
        e.preventDefault();
        this.setState({ task:''})
        setTimeout(()=> {
            this.context.resetSuccessValues();
        }, 2000);
    }
    
    render() {
        return (
            <>
            <form className="pt-5 pb-3" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="row">
                    <div className="col"><input type="text" className="form-control col-sm-4" onChange={(e) => this.handleChange(e)} value={this.state.task} id="task" name="task" placeholder="Enter Task Name" /></div>
                    <div className="col"><button type="submit" className="btn btn-primary">Add</button></div>
                    </div>
                </form>
            </>
        )
    }
}
