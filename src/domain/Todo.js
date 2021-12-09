import { AbstractTodo } from './AbstractTodo';

export class Todo extends AbstractTodo {
  constructor(todoParams) {
    super();
    this.todo = todoParams.todo;
    this.id = todoParams.id;
  }

  static fromInput(params) {
    return new Todo(params);
  }
}
