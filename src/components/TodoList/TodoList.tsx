import { useContext } from 'react';
import { SortContext } from '../../store/SortContext';
import { TodoContext } from '../../store/TodoContext';
import { TodoItem } from '../TodoItem.tsx/TodoItem';

export const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const { sortBy } = useContext(SortContext);

  const filteredTodos = todos.filter(todo => {
    if (sortBy === 'active') {
      return !todo.completed;
    }

    if (sortBy === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
