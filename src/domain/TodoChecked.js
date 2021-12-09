import { Todo } from './Todo';

export class TodoChecked extends Todo {
  constructor(todoParams) {
    super(todoParams);
    this.completed = todoParams.completed;
  }

  static fromInput(params) {
    return new TodoChecked(params);
  }
}
