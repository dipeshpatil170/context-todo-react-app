import React, { Component } from 'react'

export default class NotificationMessage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="col col-lg-6">
                <div className={this.props.type} role="alert">
                    {this.props.message}
                </div>
            </div>
        )
    }
}
