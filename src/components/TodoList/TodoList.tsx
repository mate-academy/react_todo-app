import { useContext } from 'react';
import { StateContext } from '../../context/TodoContextProvider';
import { Todo } from '../Todo/Todo';
import { FilterType } from '../../types/FilterType';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);

  const visibleTodos = (() => {
    if (filter === FilterType.All) {
      return todos;
    } else if (filter === FilterType.Active) {
      return todos.filter(todo => !todo.completed);
    }

    return todos.filter(todo => todo.completed);
  })();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
