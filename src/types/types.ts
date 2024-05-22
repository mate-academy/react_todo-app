export type ToDo = {
  id: string;
  title: string;
  completed: boolean;
  isEditing: boolean;
};

export interface State {
  todoList: ToDo[];
  filter: 'All' | 'Active' | 'Completed';
}

export type Action =
  | { type: 'ADD_TODO'; payload: ToDo }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'COMPLETE_TODO'; payload: string }
  | { type: 'EDIT_TODO'; payload: { id: string; title: string } }
  | { type: 'FILTER_All' }
  | { type: 'FILTER_ACTIVE' }
  | { type: 'TOGGLE_ALL' }
  | { type: 'FILTER_COMPLETED' }
  | { type: 'START_EDITING'; payload: string }
  | { type: 'CLEAR_COMPLETED' };

export type TodoProps = {
  todo: ToDo;
};

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export type ToDoContextProps = {
  children: React.ReactNode;
};
