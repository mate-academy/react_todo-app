import { useContext } from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoContext } from '../../TodoContext';
import { SortType } from '../../types/SortType';

type Props = {};

export const TodoList: React.FC<Props> = () => {
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
