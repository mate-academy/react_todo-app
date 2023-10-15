import cn from 'classnames';

import React, {
  useContext, useCallback, useRef, useEffect,
} from 'react';
import { Todo, todoContext, ContextType } from '../Contexts/Context';
import { TodoComponent } from './TodoItem';

const TodoList: React.FC = () => {
  const {
    todos,
    setTodos,
    visibleTodos,
    queryCondition,
    setQueryCondition,
    isAllCompleted,
    checkIsAllCompleted,
  } = useContext(todoContext) as ContextType;

  const toggleAllRef = useRef<HTMLInputElement>(null);

  const activeItems = todos.filter((todo) => !todo.completed).length;
  const completedItems = todos.filter((todo) => todo.completed).length;

  const toggleAll = useCallback(() => {
    let updatedTodos: Todo[];

    if (todos.some((todo) => !todo.completed)) {
      updatedTodos = todos.map((todo) => {
        return {
          ...todo,
          completed: true,
        };
      });
    } else {
      updatedTodos = todos.map((todo) => {
        return {
          ...todo,
          completed: false,
        };
      });
    }

    setTodos(updatedTodos);
  }, [setTodos, todos]);

  useEffect(() => {
    checkIsAllCompleted();
    if (toggleAllRef.current) {
      toggleAllRef.current.checked = !isAllCompleted;
    }
  }, [checkIsAllCompleted, isAllCompleted, todos]);

  const clearCompleted = useCallback(() => {
    setTodos([...todos.filter((todo) => !todo.completed)]);
  }, [setTodos, todos]);

  return (
    <>
      <section className="main">
        <input
          ref={toggleAllRef}
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todosList">
          {visibleTodos.map((todo) => (
            <TodoComponent todo={todo} key={todo.id} />
          ))}
        </ul>
      </section>

      <footer className="footer" data-cy="todosFilter">
        <span className="todo-count" data-cy="todosCounter">
          {activeItems === 1 ? '1 item left' : `${activeItems} items left`}
        </span>

        <ul className="filters">
          <li>
            <a
              href="#/"
              className={cn({
                selected: queryCondition === 'all',
              })}
              onClick={() => setQueryCondition('all')}
            >
              All
            </a>
          </li>

          <li>
            <a
              href="#/active"
              className={cn({
                selected: queryCondition === 'active',
              })}
              onClick={() => setQueryCondition('active')}
            >
              Active
            </a>
          </li>

          <li>
            <a
              href="#/completed"
              className={cn({
                selected: queryCondition === 'completed',
              })}
              onClick={() => setQueryCondition('completed')}
            >
              Completed
            </a>
          </li>
        </ul>

        {!!completedItems && (
          <button
            type="button"
            className="clear-completed"
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </>
  );
};

export default TodoList;
