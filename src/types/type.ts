export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type Props = {
  todos: Todo[];
  onSelected: () => void;
  onRemove: () => void;
};

export type TodoContextType = {
  todo: Todo[];
  handleSelected: (id: number) => void;
  handleRemove: (id: number) => void;
  handleFilterAll: () => void;
  handleActive: () => void;
  handleCompleted: () => void;
  filteredTodo: Todo[];
  filter: 'all' | 'active' | 'completed';
  handleRemoveCompleted: () => void;
  setTodo: (todos: Todo[]) => void;
};
