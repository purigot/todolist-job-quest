import { TodosController } from "../controllers/todosController";

export class Routes {

    public todosController: TodosController = new TodosController();

    public routes(app: any): void {

        // Get todo
        app.route("/todos/getTodo")
            .get(this.todosController.getTodo);

        // Get todo by ID
        app.route("/todos/getTodoById/:id")
            .get(this.todosController.getTodoById);

        // POST new todo
        app.route("/todos/createTodo")
            .post(this.todosController.createTodo);

        // Update todo
        app.route("/todos/updateTodo/:id")
            .put(this.todosController.updateTodo);

        // Update complete state
        app.route("/todos/updateCompleted/:id")
            .put(this.todosController.updateCompleted);

        // Delete todo
        app.route("/todos/deleteTodo/:id")
            .delete(this.todosController.deleteTodo);
    }
}