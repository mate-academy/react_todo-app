import { Todo, IsActiveTab } from '../types';

export function filterTodos(todos: Todo[], activeTab: IsActiveTab) {
  return todos.filter((todo: Todo) => {
    if (activeTab === IsActiveTab.Active) {
      return !todo.completed;
    }

    if (activeTab === IsActiveTab.Completed) {
      return todo.completed;
    }

    return todo;
  });
}
