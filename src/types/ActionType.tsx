export type Action =
  | { type: 'add-todo'; payload: { title: string } }
  | { type: 'edit-todo'; payload: { id: Date; title: string } }
  | { type: 'delete-todo'; payload: { id: Date } }
  | { type: 'toggle-todo'; payload: { id: Date } }
  | { type: 'toggle-all-todo'; payload: { completed: boolean } }
  | { type: 'clear-completed' };
