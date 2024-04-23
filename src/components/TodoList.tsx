import { useContext } from 'react';
import { TodoContext } from './TodoContext';
import { SortType } from '../types/SortType';
import { TodoInfo } from './TodoInfo';

export const TodoList: React.FC = () => {
  const { todos, sortType } = useContext(TodoContext);

  const filteredTodos = todos.filter(todo => {
    switch (sortType) {
      case SortType.Active:
        return !todo.completed;

      case SortType.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
