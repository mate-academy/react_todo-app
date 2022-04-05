import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import {
  setActiveFilterAction,
  setCompletedTodosAction,
  setNewTodoAction,
  setTodosAction,
  setVisibleTodosAction,
} from './store/actions';
import {
  getActiveFilterSelector,
  getCompletedTodosSelector,
  getNewTodoSelector,
  getTodosSelector,
  getVisibleTodosSelector,
} from './store/selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const visibleTodos = useSelector(getVisibleTodosSelector);
  const completedTodos = useSelector(getCompletedTodosSelector);
  const newTodoTitle = useSelector(getNewTodoSelector);
  const activeFilter = useSelector(getActiveFilterSelector);

  const filter = {
    all: () => {
      dispatch(setVisibleTodosAction(todos));
      dispatch(setActiveFilterAction('all'));
    },
    active: () => {
      dispatch(setVisibleTodosAction(todos.filter(todo => !completedTodos.includes(todo.id))));
      dispatch(setActiveFilterAction('active'));
    },
    completed: () => {
      dispatch(setVisibleTodosAction(todos.filter(todo => completedTodos.includes(todo.id))));
      dispatch(setActiveFilterAction('completed'));
    },
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(setCompletedTodosAction(todos.map(todo => todo.id)));
    }

    if (!event.target.checked) {
      dispatch(setCompletedTodosAction([]));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      id: Math.random(),
      title: newTodoTitle,
      completed: false,
    };

    dispatch(setTodosAction([...todos, newTodo]));
    dispatch(setNewTodoAction(''));
  };

  const handleClearAll = () => {
    const filteredTodos = todos.filter(todo => !completedTodos.includes(todo.id));

    dispatch(setTodosAction(filteredTodos));
    dispatch(setCompletedTodosAction(completedTodos
      .filter(id => filteredTodos.some(todo => todo.id === id))));
  };

  useEffect(() => {
    if (activeFilter === 'all') {
      filter.all();
    } else if (activeFilter === 'active') {
      filter.active();
    } else {
      filter.completed();
    }
  }, [todos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1 className="todoapp__title">todos</h1>

        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            className="todoapp__input new-todo"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={(event) => dispatch(setNewTodoAction(event.target.value))}
          />
        </form>
      </header>

      <section className="main">
        <label htmlFor="toggle-all" className="main__toggle-label">
          <input
            type="checkbox"
            id="toggle-all"
            className="main__toggle-check"
            onChange={(event) => handleToggleAll(event)}
          />
          <div className={classNames(
            'main__toggle-button',
            { checked: todos.length === completedTodos.length },
          )}
          />
        </label>

        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          completedTodos={completedTodos}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {`${todos.length - completedTodos.length} items left`}
        </span>

        <TodosFilter filter={filter} activeFilter={activeFilter} />
        <button
          type="button"
          className="clear-completed"
          onClick={handleClearAll}
        >
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default App;
