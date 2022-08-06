import classNames from 'classnames';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { TodosContextType } from '../types/TodosContext';
import { FormCreateTodo } from './formCreateTodo';
import { TodosContext } from './todoContext';
import { TodoList } from './todoList';

enum FilterBy {
  Completed = 'completed',
  Active = 'active',
}

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  { selected: status.isActive },
);

export const TodoApp = () => {
  const {
    todos,
    addTodo,
    toogleALL,
    deleteAllCompleted,
  } = useContext(TodosContext) as TodosContextType;
  const { filterBy } = useParams();
  const [isAllCompleted, setIsAllCompleted] = useState(false);

  useEffect(() => {
    const isAlltrue = todos.every(item => item.completed);

    setIsAllCompleted(isAlltrue);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterBy.Active:
          return !todo.completed;

        case FilterBy.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <FormCreateTodo onSubmit={addTodo} />
      </header>
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={!isAllCompleted}
          onChange={() => toogleALL(isAllCompleted)}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <TodoList todos={visibleTodos} />
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {todos.filter(todo => todo.completed === false).length}
          {' '}
          items left
        </span>

        <ul className="filters">
          <li>
            <NavLink
              to="/"
              className={getActiveClasses}
            >
              All
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/${FilterBy.Active}`}
              className={getActiveClasses}
            >
              Active
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/${FilterBy.Completed}`}
              className={getActiveClasses}
            >
              Completed
            </NavLink>
          </li>
        </ul>

        <button
          type="button"
          className="clear-completed"
          onClick={deleteAllCompleted}
        >
          Clear completed
        </button>
      </footer>
    </div>
  );
};
