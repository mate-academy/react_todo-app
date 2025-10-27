import { FC } from 'react';
import { TodoItem } from './TodoItem';
import { useTodoContext } from '../context/TodoContext';
import { Filter } from '../types/Filter';

export const TodoList: FC = () => {
  const { todos, filter } = useTodoContext();
  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    if (filter === Filter.COMPLETED) {
      return todo.completed;
    }

    return true;
  });

  if (!filteredTodos.length) {
    return;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
