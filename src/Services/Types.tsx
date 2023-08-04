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

export enum ActionTypeEnum {
  Add = 'add_todo',
  Delete = 'delete_todo',
  Edit = 'edit_todo',
  Complete = 'complete_todo',
  CompleteAll = 'toggle_all',
  Filter = 'toggle_filter',
  ClearCompleted = 'clear_completed',
}

export type Action = ActionAdd
| ActionDelete
| ActionEdit
| ActionComplete
| ActionToggleAll
| ActionToggleFilter
| ActionClearCompleted;

export type ActionAdd = {
  type: ActionTypeEnum.Add,
  payload: {
    todo: Todo,
  }
};

export type ActionDelete = {
  type: ActionTypeEnum.Delete,
  payload: {
    todoId: number,
  }
};

export type ActionComplete = {
  type: ActionTypeEnum.Complete,
  payload: {
    todoId: number,
  }
};

export type ActionToggleAll = {
  type: ActionTypeEnum.CompleteAll,
  payload: {
    completed: boolean
  }
};

export type ActionToggleFilter = {
  type: ActionTypeEnum.Filter,
  payload: {
    filterType: Status
  }
};

export type ActionClearCompleted = {
  type: ActionTypeEnum.ClearCompleted,
  payload: {}
};

export type ActionEdit = {
  type: ActionTypeEnum.Edit,
  payload: {
    todoId: number,
    newTitle: string,
  }
};
