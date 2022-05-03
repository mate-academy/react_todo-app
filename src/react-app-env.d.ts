/// <reference types="react-scripts" />

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

type ContextType = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  activeTodos: Todo[],
  setActiveTodos: (todos: Todo[]) => void,
  completedTodos: Todo[],
  setCompletedTodos: (todos: Todo[]) => void,
  visibleTodos: Todo[],
  setVisibleTodos: (todos: Todo[]) => void,
};
