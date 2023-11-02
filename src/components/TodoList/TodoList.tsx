import cn from 'classnames';
import React, { useContext, useMemo } from 'react';
import { TodosContext } from '../../store/TodosContext';
import { getVisibleTodos } from '../../utils/getVisibleTodos';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filter } = useContext(TodosContext);

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, filter);
  }, [todos, filter]);

  const areCompleted = todos.every(todo => todo.completed);

  const toggleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !areCompleted,
    })));
  };

  return (

    <section className="main">
      {todos.length > 0 && (
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
            onClick={toggleAll}
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
