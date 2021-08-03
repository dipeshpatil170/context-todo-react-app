import React, { Component } from 'react'
import { TodoContext } from '../contexts/TodoContext';

export default class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
            invalidTask: false
        }
    }
    static contextType = TodoContext;

    handleChange(e) {
        this.setState({ task: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.task.trim() === "") {
            this.setState({ invalidTask: true })
            return false;
        } else {
            this.setState({ invalidTask: false })
            this.context.addTask(this.state.task.trim());
            this.setState({ task: '' })
        }
        setTimeout(()=> {
            this.context.resetSuccessValues();
        }, 1000);
    }
    
    render() {
        return (
            <>
            <form className="pt-5 pb-3" onSubmit={(e) => this.handleSubmit(e)}>
                <div className="row">
                    <div className="col"><input type="text" className="form-control col-sm-4" onChange={(e) => this.handleChange(e)} value={this.state.task} id="task" name="task" placeholder="Enter Task Name" /></div>
                    <div className="col"><button type="submit" className="btn btn-primary">Add</button></div>
                    </div>
                    {this.state.invalidTask && (
                        <div className="row">
                            <small className="text-danger">Task name should not be empty..!</small>
                        </div>
                    )}
                </form>
            </>
        )
    }
}
