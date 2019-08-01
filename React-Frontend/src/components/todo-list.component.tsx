import axios from "axios";
import React, { Component } from "react";

import Todo from "./todo-item.component";

export default class TodoList extends Component {

    public state = {
        todos: [],
    };

    public componentDidMount = () => {
        axios.get("http://34.87.65.231:4000/todos")
            .then((response) => {
                this.setState({
                    todos: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    public componentDidUpdate(prevState: any) {

        axios.get("http://34.87.65.231:4000/todos")
            .then((response) => {
                this.setState({
                    todos: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }

    public todolist = () => {
        return this.state.todos.map((currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        });
    }

    public render() {
        return (
            <div>
                <h3>Todos List</h3>
                <div className="table-container">
                    <table className="ui definition selectable fixed table">
                        <thead className="full-width">
                            <tr>
                                <th className="one wide"></th>
                                <th>Title</th>
                                <th>Description</th>
                                <th className="two wide">Priority</th>
                                <th className="two wide">Actions</th>
                                <th className="one wide"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.todolist()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
