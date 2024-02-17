import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { DispatchContext, StateContext } from '../TodoContext';
import { Status } from '../../types/status';
import { Todo } from '../../types/todo';

const getPreparedTodos = (todosList: Todo[], selectedPage: string) => {
  switch (selectedPage) {
    case Status.ACTIVE:
      return todosList.filter(todo => !todo.completed);

    case Status.COMPLETED:
      return todosList.filter(todo => todo.completed);

    default:
      return todosList;
  }
};

export const TodoList: React.FC = React.memo(() => {
  const dispatch = useContext(DispatchContext);
  const { todos, select } = useContext(StateContext);

  const visibleTodos = getPreparedTodos(todos, select);
  console.log('Rendering TodoList');

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => dispatch({ type: 'CompletedAll' })}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  );
});
