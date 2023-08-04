export type Todo = {
  id: number,
  title: string,
  completed: boolean,
};

export enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export type State = {
  todos: Todo[],
  filter: Status,
};

export type Action = ActionAdd
| ActionDelete
| ActionEdit
| ActionComplete
| AcctionToggleAll
| ActionToggleFilter
| ActionClearCompleted;

type ActionAdd = {
  type: 'add_todo',
  todo: Todo,
};

type ActionDelete = {
  type: 'delete_todo',
  todoId: number,
};

type ActionComplete = {
  type: 'complete_todo',
  todoId: number,
};

type AcctionToggleAll = {
  type: 'toggle_all'
  completed: boolean
};

type ActionToggleFilter = {
  type: 'toggle_filter',
  filterType: Status
};

type ActionClearCompleted = {
  type: 'clear_completed',
};

type ActionEdit = {
  type: 'edit_todo',
  todoId: number,
  newTitle: string,
};
