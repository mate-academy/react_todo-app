import { Todo } from '../types/Todo';
import { TodoStatistic } from '../types/TodoStatistic';

export function getTodosStatistic(todos: Todo[]): TodoStatistic {
  const all = todos.length;

  const active = todos.reduce(
    (sum, todo) => (todo.completed ? sum : sum + 1),
    0,
  );

  const completed = all - active;

  return { all, active, completed };
}
