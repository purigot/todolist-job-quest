import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import ITodoItem from "../interfaces/TodoItem.interface";

interface IState {
    showModal: boolean;
}

class Todo extends Component<ITodoItem, IState> {

    constructor(props: ITodoItem) {
        super(props);

        this.state = {
            showModal: false,
        };

    }

    public onTogglecompleted = (e: any) => {

        const obj = {
            completed: false,
        };

        if (e.target.checked === true) {
            obj.completed = true;
        }

        axios.put("http://34.87.65.231:4000/todos/" + this.props.todo.id, obj)
            .then((response) => {
                console.log(response);
            });

    }

    public deleteTodoItem = () => {
        axios.delete("http://34.87.65.231:4000/todos/" + this.props.todo.id)
            .then((response) => {
                console.log(response);
            });

        this.modalClose();
    }

    public modalOpen = () => {
        this.setState({ showModal: true });
    }

    public modalClose = () => {
        this.setState({ showModal: false });
    }

    public render() {

        let priorityTag = "";

        switch (this.props.todo.priority) {
            case "Low":
                priorityTag = "blue";
                break;

            case "Medium":
                priorityTag = "orange";
                break;

            case "High":
                priorityTag = "red";
                break;
        }

        return (
            <tr className={this.props.todo.completed ? "active" : ""}>
                <td>
                    <div className="center-checkbox">
                        <input
                            type="checkbox"
                            onChange={this.onTogglecompleted}
                            checked={this.props.todo.completed}
                        />
                    </div>
                </td>
                <td>{this.props.todo.title}</td>
                <td>{this.props.todo.description}</td>
                <td>
                    <label className={`ui horizontal label ${priorityTag}`}>
                        {this.props.todo.priority}
                    </label>
                </td>
                <td>
                    <Link to={"/edit/" + this.props.todo.id}>Edit</Link>
                </td>
                <td>

                    <Modal
                        trigger={<i className="trash icon" onClick={this.modalOpen} />}
                        basic size="small"
                        open={this.state.showModal}
                        onClose={this.modalClose}
                    >
                        <Header icon="archive" content="Delete Todo" />
                        <Modal.Content>
                            <p>
                                Are you sure to delete this todo?
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.modalClose} basic color="red" inverted>
                                <Icon name="remove" /> No
                            </Button>
                            <Button onClick={this.deleteTodoItem} color="green" inverted>
                                <Icon name="checkmark" /> Yes
                            </Button>
                        </Modal.Actions>
                    </Modal>

                </td>
            </tr>
        );

    }

}

export default Todo;
