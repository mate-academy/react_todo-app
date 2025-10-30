export type Action =
  | { type: 'add'; payload: { title: string } }
  | { type: 'delete'; payload: { id: number } }
  | { type: 'clearCompleted' }
  | { type: 'toggleTodo'; payload: { id: number } }
  | { type: 'toggle' }
  | { type: 'edit'; payload: { id: number; title: string } };
