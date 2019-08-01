import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodoList from "./components/todo-list.component";

class App extends React.Component {
  public render() {
    return (
      <Router>
        <div className="ui center-container">
          <div className="ui container card">
            <nav className="ui yellow inverted huge menu" style={{marginBottom: 0}}>
              <div className="header item">Todolist Job Quest</div>
              <Link className="item" to="/">Todos</Link>
              <Link className="item" to="/create">Create Todo</Link>
            </nav>
            <div className="content">
              <Route exact path="/" component={TodoList} />
              <Route path="/edit/:id" component={EditTodo} />
              <Route path="/create" component={CreateTodo} />
            </div>
          </div>
        </div>

      </Router>

    );
  }
}

export default App;
