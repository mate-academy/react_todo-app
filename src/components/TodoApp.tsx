import { useContext, useEffect, useState } from 'react';

import { TodosContext } from '../TodosContext';
import TodoList from './TodoList';
import TodosFilter, { Status } from './TodosFilter';
import { Todo } from '../types/Todo';

const filteredTodos = (todos: Todo[], filter: Status) => {
  return [...todos].filter(todo => {
    switch (filter) {
      case Status.All: {
        return true;
      }

      case Status.Active: {
        return todo.completed === false;
      }

      case Status.Completed: {
        return todo.completed === true;
      }

      default:
        return true;
    }
  });
};

const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);
  const nonCompleted = state.filter(todo => !todo.completed).length;
  const completed = state.length - nonCompleted;

  const [title, setTitle] = useState('');
  const [nonCompletedCount, setNonCompletedCount] = useState(nonCompleted);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [filter, setFilter] = useState(Status.All);

  useEffect(() => {
    setNonCompletedCount(nonCompleted);
  }, [state, nonCompleted]);

  const todos = filteredTodos(state, filter);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch({
      type: 'create',
      payload: {
        id: +new Date(),
        title,
        completed: false,
      },
    });

    setTitle('');
    setNonCompletedCount(prev => prev + 1);
  };

  const handleAllStatus = () => {
    setIsAllCompleted(prev => !prev);

    const newTodos = state.map(todo => {
      return {
        ...todo,
        completed: !isAllCompleted,
      };
    });

    dispatch({
      type: 'updateAll',
      payload: newTodos,
    });
  };

  const handleDeleteCompleted = () => {
    dispatch({
      type: 'deleteCompleted',
    });
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      {state.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isAllCompleted}
              onChange={handleAllStatus}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={todos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${nonCompletedCount} items left`}
            </span>

            <TodosFilter
              data-cy="todosFilter"
              filter={filter}
              setFilter={setFilter}
            />
            {completed > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleDeleteCompleted}
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

export default TodoApp;
