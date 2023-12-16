/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
} from 'react';
import cn from 'classnames';
import { TodoList } from './Components/TodoList';
import {
  Actions,
  DispatchContext,
  Keys,
  StateContext,
} from './Components/Store/Store';

enum TodosType {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const App: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const [todoTitle, setTodoTitle] = useState('');
  const {
    allTodos,
  } = useContext(StateContext);
  const activeTodos = allTodos?.filter(todo => !todo.completed) || [];
  const completedTodos = allTodos?.filter(todo => todo.completed) || [];
  const [visibleTodosType, setVisibleTodosType] = useState(TodosType.all);

  let visibleTodos = allTodos;

  if (visibleTodosType === TodosType.all) {
    visibleTodos = allTodos;
  } else if (visibleTodosType === TodosType.active) {
    visibleTodos = activeTodos;
  } else {
    visibleTodos = completedTodos;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleBlur = () => {
    if (todoTitle.trim()) {
      dispatch({
        type: Actions.addNew,
        todo: {
          id: +new Date(),
          title: todoTitle,
          completed: false,
        },
      });
      setTodoTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === Keys.Enter && todoTitle.trim()) {
      e.preventDefault();
      dispatch({
        type: Actions.addNew,
        todo: {
          id: +new Date(),
          title: todoTitle,
          completed: false,
        },
      });
      setTodoTitle('');
    }

    return 0;
  };

  const setAllTodosVisible = () => {
    visibleTodos = allTodos;
    setVisibleTodosType(TodosType.all);
  };

  const setActiveTodosVisible = () => {
    visibleTodos = activeTodos;
    setVisibleTodosType(TodosType.active);
  };

  const setComplitedTodosVisible = () => {
    visibleTodos = completedTodos;
    setVisibleTodosType(TodosType.completed);
  };

  const handleToogleAll = () => {
    dispatch({ type: Actions.markAll });
  };

  const destroyCompletedTodos = () => {
    dispatch({ type: Actions.destroyCompleted });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </form>
      </header>
      {allTodos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={handleToogleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={visibleTodos} />
          </section>

          <footer className="footer" data-cy="todosFilter">
            <span className="todo-count" data-cy="todosCounter">
              {activeTodos.length === 1
                ? `${activeTodos.length} item left`
                : `${activeTodos.length} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={cn({
                    selected: visibleTodosType === TodosType.all,
                  })}
                  onClick={setAllTodosVisible}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={cn({
                    selected: visibleTodosType === TodosType.active,
                  })}
                  onClick={setActiveTodosVisible}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={cn({
                    selected: visibleTodosType === TodosType.completed,
                  })}
                  onClick={setComplitedTodosVisible}
                >
                  Completed
                </a>
              </li>
            </ul>

            {completedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={destroyCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
