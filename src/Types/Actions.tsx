export type Action =
  | { type: 'submit'; payload: string }
  | { type: 'onInputChange'; payload: string }
  | { type: 'onCheckboxChange'; payload: number }
  | { type: 'onTodoDelete'; payload: number }
  | { type: 'showFiltered'; payload: string }
  | { type: 'showAll' }
  | { type: 'clearCompleted' }
  | { type: 'onToggle'; payload: boolean }
  | { type: 'editTodoName'; payload: { todoId: number; newTodoName: string } };
