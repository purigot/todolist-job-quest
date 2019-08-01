import { TodosController } from "../controllers/todosController";

export class Routes {

    public todosController: TodosController = new TodosController();

    public routes(app: any): void {

        app.route("/todos")
            .get(this.todosController.getTodo)
            .post(this.todosController.createTodo)

        app.route("/todos/:id")
            .get(this.todosController.getTodoById)
            .patch(this.todosController.updateTodo)
            .patch(this.todosController.updateCompleted)
            .delete(this.todosController.deleteTodo)
    }
}