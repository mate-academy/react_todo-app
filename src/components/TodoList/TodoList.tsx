import cn from 'classnames';
import React, { useContext } from 'react';
import { TodosContext } from '../../store/TodosContext';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const {
    todos,
    setTodos,
    getVisibleTodos,
  } = useContext(TodosContext);

  const visibleTodos = getVisibleTodos();
  const areCompleted = todos.every(todo => todo.completed);

  const toggleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !areCompleted,
    })));
  };

  return (

    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className={cn('toggle-all',
              {
                active: areCompleted,
              })}
            data-cy="toggleAll"
            checked={areCompleted}
            onChange={toggleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {visibleTodos.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
