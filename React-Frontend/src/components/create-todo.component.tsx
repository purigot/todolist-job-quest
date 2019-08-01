import axios from "axios";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router";

export default class CreateTodo extends Component<RouteComponentProps> {

    public state = {
        completed: false,
        description: "",
        priority: "Low",
        title: "",
    };

    public render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Create New Todo</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="ui form">
                        <label>Title: </label>
                        <input
                            type="text"
                            className="ui input"
                            value={this.state.title}
                            onChange={this.onChangeTodoTitle}
                            required
                        />
                    </div>

                    <div className="ui hidden divider" />

                    <div className="ui form">
                        <div className="field">
                            <label>Description: </label>
                            <textarea
                                value={this.state.description}
                                onChange={this.onChangeTodoDescription}
                                required
                            />
                        </div>
                    </div>

                    <div className="ui hidden divider" />

                    <div className="ui form">
                        <div className="inline fields">
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input
                                        type="radio"
                                        name="priorityOptions"
                                        id="priorityLow"
                                        value="Low"
                                        checked={this.state.priority === "Low"}
                                        onChange={this.onChangeTodoPriority}
                                    />
                                    <label>Low</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input
                                        type="radio"
                                        name="priorityOptions"
                                        id="priorityMedium"
                                        value="Medium"
                                        onChange={this.onChangeTodoPriority}
                                    />
                                    <label>Medium</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="ui radio checkbox">

                                    <input
                                        type="radio"
                                        name="priorityOptions"
                                        id="priorityHigh"
                                        value="High"
                                        onChange={this.onChangeTodoPriority}
                                    />
                                    <label>High</label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="ui form">
                        <input type="submit" value="Create Todo" className="ui yellow button" />
                    </div>
                </form>

            </div>
        );
    }

    public onChangeTodoDescription = (e: any) => {
        this.setState({ description: e.target.value });
    }

    public onChangeTodoTitle = (e: any) => {
        this.setState({ title: e.target.value });
    }

    public onChangeTodoPriority = (e: any) => {
        this.setState({ priority: e.target.value });
    }

    public onSubmit = (e: any) => {
        e.preventDefault();

        const newTodo = {
            completed: this.state.completed,
            description: this.state.description,
            priority: this.state.priority,
            title: this.state.title,
        };

        axios.post("http://34.87.65.231:4000/todos", newTodo)
            .then((res) => console.log(res));

        this.props.history.push("/");

        this.setState({
            completed: false,
            description: "",
            priority: "",
            title: "",
        });
    }
}
