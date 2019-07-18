import axios from "axios";
import React, { Component } from "react";
import { RouteComponentProps } from "react-router";

interface IIdParams {
    id: string;
}

export default class EditTodo extends Component<RouteComponentProps<IIdParams>> {

    public state = {
        description: "",
        priority: "",
        title: "",
    };

    public componentDidMount() {

        axios.get("http://localhost:4000/todos/getTodoById/" + this.props.match.params.id)
            .then((response) => {
                const { title, description, priority } = response.data[0];
                this.setState({
                    description,
                    priority,
                    title,
                });
            })
            .catch((error) => {
                console.log(error);
            });
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

        const obj = {
            description: this.state.description,
            priority: this.state.priority,
            title: this.state.title,
        };

        axios.put("http://localhost:4000/todos/updateTodo/" + this.props.match.params.id, obj)
            .then((res) => console.log(res));

        this.props.history.push("/");

        this.setState({
            description: "",
            priority: "",
            title: "",
        });
    }

    public render() {

        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="ui form">
                        <label>Title: </label>
                        <input
                            required
                            type="text"
                            className="ui input"
                            value={this.state.title}
                            onChange={this.onChangeTodoTitle}
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
                                        checked={this.state.priority === "Medium"}
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
                                        checked={this.state.priority === "High"}
                                        onChange={this.onChangeTodoPriority}
                                    />
                                    <label>High</label>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="ui form">
                        <input type="submit" value="Update Todo" className="ui yellow button" />
                    </div>
                </form>

            </div>
        );
    }
}
