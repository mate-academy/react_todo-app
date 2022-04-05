/// <reference types="react-scripts" />

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

interface State {
  todos: Todo[],
  visibleTodos: Todo[],
  completedTodos: number[],
  newTodo: string,
  activeFilter: string,
  editingId: number,
  initialTitle: string[],
}

interface Action {
  type: string,
  payload: any,
}
