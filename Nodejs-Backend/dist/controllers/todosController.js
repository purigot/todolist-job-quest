"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var uuid_1 = __importDefault(require("uuid"));
var pool = new pg_1.Pool({
    database: "todolist",
    host: "34.87.65.231",
    password: "123456",
    port: 5432,
    user: "admin",
});
var TodosController = /** @class */ (function () {
    function TodosController() {
    }
    TodosController.prototype.getTodo = function (req, res) {
        pool.query("SELECT * FROM todos ORDER BY completed ASC, updated_at", function (error, results) {
            if (error) {
                res.send(error);
            }
            res.json(results.rows);
        });
    };
    TodosController.prototype.getTodoById = function (req, res) {
        var id = req.params.id;
        pool.query("SELECT * FROM todos WHERE id = $1", [id], function (error, results) {
            if (error) {
                res.send(error);
            }
            res.status(200).json(results.rows);
        });
    };
    TodosController.prototype.createTodo = function (req, res) {
        var id = uuid_1.default.v4();
        var _a = req.body, title = _a.title, description = _a.description, priority = _a.priority, completed = _a.completed;
        pool.query("INSERT INTO todos (id, title, description, priority, completed) VALUES ($1, $2, $3, $4, $5)", [id, title, description, priority, completed], function (error, results) {
            if (error) {
                res.send(error);
            }
            res.status(201).send("Create todo with ID: " + id);
        });
    };
    TodosController.prototype.updateTodo = function (req, res) {
        var id = req.params.id;
        var _a = req.body, title = _a.title, description = _a.description, priority = _a.priority;
        pool.query("UPDATE todos SET title = $1, description = $2, priority = $3 WHERE id = $4", [title, description, priority, id], function (error, results) {
            if (error) {
                res.send(error);
            }
            res.status(200).send("Todo modified with ID: " + id);
        });
    };
    TodosController.prototype.updateCompleted = function (req, res) {
        var id = req.params.id;
        var completed = req.body.completed;
        pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id], function (error, results) {
            if (error) {
                res.send(error);
            }
            res.status(200).send(results);
        });
    };
    TodosController.prototype.deleteTodo = function (req, res) {
        var id = req.params.id;
        pool.query("DELETE FROM todos WHERE id = $1", [id], function (error, results) {
            if (error) {
                res.send(error);
            }
            res.status(200).send("Todo deleted with ID: " + id);
        });
    };
    return TodosController;
}());
exports.TodosController = TodosController;
