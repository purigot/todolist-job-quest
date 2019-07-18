import { QueryResult, Pool } from "pg";
import { Request, Response } from 'express';
import uuid from "uuid";

const pool = new Pool({
    database: "todolist",
    host: "34.87.65.231",
    password: "123456",
    port: 5432,
    user: "admin",
});

export class TodosController {

    public getTodo(req: Request, res: Response) {
        pool.query("SELECT * FROM todos ORDER BY completed ASC, updated_at", (error: Error, results: QueryResult) => {
            if (error) {
                res.send(error);
            }
            res.json(results.rows);
        });
    }

    public getTodoById(req: Request, res: Response) {
        const id = req.params.id;
        pool.query("SELECT * FROM todos WHERE id = $1", [id], (error: Error, results: QueryResult) => {
            if (error) {
                res.send(error);
            }

            res.status(200).json(results.rows);
        });
    }

    public createTodo(req: Request, res: Response) {
        const id = uuid.v4();
        const { title, description, priority, completed } = req.body;

        pool.query("INSERT INTO todos (id, title, description, priority, completed) VALUES ($1, $2, $3, $4, $5)"
            , [id, title, description, priority, completed], (error: Error, results: QueryResult) => {
                if (error) {
                    res.send(error);
                }
                res.status(201).send(`Create todo with ID: ${id}`);
            });
    }

    public updateTodo(req: Request, res: Response) {
        const id = req.params.id;
        const { title, description, priority } = req.body;

        pool.query(
            "UPDATE todos SET title = $1, description = $2, priority = $3 WHERE id = $4",
            [title, description, priority, id],
            (error: Error, results: QueryResult) => {
                if (error) {
                    res.send(error);
                }
                res.status(200).send(`Todo modified with ID: ${id}`);
            },
        );
    }

    public updateCompleted(req: Request, res: Response) {
        const id = req.params.id;
        const { completed } = req.body;

        pool.query("UPDATE todos SET completed = $1 WHERE id = $2", [completed, id], (error: Error, results: QueryResult) => {
            if (error) {
                res.send(error);
            }
            res.status(200).send(results);
        });
    }

    public deleteTodo(req: Request, res: Response) {
        const id = req.params.id;

        pool.query("DELETE FROM todos WHERE id = $1", [id], (error: Error, results: QueryResult) => {
            if (error) {
                res.send(error);
            }
            res.status(200).send(`Todo deleted with ID: ${id}`);
        });
    }
}