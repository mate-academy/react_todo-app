import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Status, TodosContext } from '../../context/TodosContext';

export const TodoList: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);

  const allCompleted = state.todos.every(todo => todo.completed);

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === Status.All) {
      return true;
    }

    if (state.filter === Status.Active) {
      return !todo.completed;
    }

    if (state.filter === Status.Completed) {
      return todo.completed;
    }

    return false;
  });

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'toggleAll', payload: event.target.checked });
  };

  return (
    <section className="main">
      {state.todos.length > 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={handleToggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {filteredTodos.map(todo => {
              return <TodoItem key={todo.id} todo={todo} />;
            })}
          </ul>
        </>
      )}
    </section>
  );
};
