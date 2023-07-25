export type Todo = {
  id: number;
  title: string;
  completed: true | false;
};

export enum Status {
  all,
  active,
  completed,
}

export type State = {
  todoList: Todo[],
  filter: Status;
};

export type Action = { type: 'add', payLoad: string }
| { type: 'isComplete', payLoad: true | false, id: number }
| { type: 'isCompleteAll' }
| { type: 'deleteTodo', id: number }
| { type: 'deleteAllCompleted' }
| { type: 'filter', payLoad: Status }
| { type: 'editTodo', id: number, newTodoTitle: string };
