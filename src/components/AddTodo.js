import React, { Component } from 'react'
import { TodoContext } from '../contexts/TodoContext';

export default class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: '',
            description:'',
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
            const newtask = {
                name: this.state.task.trim(),
                description: this.state.description.trim()
            }
            this.context.addTask(newtask);
            this.setState({ task: '', description:'' })
        }
        setTimeout(()=> {
            this.context.resetSuccessValues();
        }, 1000);
    }
    
    render() {
        return (
            <>
                <form className="pt-5 pb-3" onSubmit={(e) => this.handleSubmit(e)}>
                    <div class="form-floating mb-3 col-sm-4">
                        <input type="text" class="form-control " id="name" placeholder="Task Name" onChange={(e) => this.handleChange(e)} value={this.state.task} id="task" />
                            <label for="name">Task Name</label>
                    </div>
                    <div class="form-floating col-sm-4">
                        <textarea class="form-control" placeholder="Write description here" id="description" style={{ height: "100px" }} onChange={(e) => this.setState({description:e.target.value})} value={this.state.description}></textarea>
                            <label for="comment">Description</label>
                        </div>
                    <div class="pt-2 col-sm-4">
                        <button type="submit" className="btn btn-primary form-control">Add</button>
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
