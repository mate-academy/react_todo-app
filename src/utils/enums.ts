export enum FilterForTodos {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export enum ActionType {
  Add = 'add',
  OnEdit = 'onEdit',
  Delete = 'delete',
  Edit = 'edit',
  Completed = 'completed',
  ClearCompleted = 'clearCompleted',
  ToggleAll = 'toggleAll',
  CancelEdit = 'cancelEdit',
  FilterBy = 'filterBy',
}
