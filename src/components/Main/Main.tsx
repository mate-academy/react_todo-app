import { useContext } from 'react';
import { TodosContext } from '../../store/Store';
import { filterTodos } from '../../utils/utils';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

export const Main = () => {
  const { todos, filter } = useContext(TodosContext);
  const displayedTodos: Todo[] = filterTodos(filter, todos);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {displayedTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
