export type Action =
  | { type: 'add-todo'; payload: { name: string } }
  | { type: 'edit-todo'; payload: { id: Date; name: string } }
  | { type: 'delete-todo'; payload: { id: Date } }
  | { type: 'toggle-todo'; payload: { id: Date } }
  | { type: 'toggle-all-todo'; payload: { completed: boolean } }
  | { type: 'clear-completed'};
