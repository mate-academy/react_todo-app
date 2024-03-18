import { useContext, useEffect, useState } from 'react';

import { TodosContext } from '../TodosContext';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';
import { Todo } from '../types/Todo';
import { Status } from '../enums/Status';

const filteredTodos = (todos: Todo[], filter: Status): Todo[] => {
  switch (filter) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);
    case Status.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};

const TodoApp: React.FC = () => {
  const { state, dispatch } = useContext(TodosContext);

  const [title, setTitle] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  const [notCompletedCount, setNotCompletedCount] = useState(0);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [filter, setFilter] = useState(Status.All);

  useEffect(() => {
    const notCompleted = state.filter(todo => !todo.completed).length;
    const completed = state.length - notCompleted;

    if (completed === state.length) {
      setIsAllCompleted(true);
    } else {
      setIsAllCompleted(false);
    }

    setNotCompletedCount(notCompleted);
    setCompletedCount(completed);
  }, [state, isAllCompleted]);

  const todos = filteredTodos(state, filter);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      dispatch({
        type: 'create',
        payload: {
          id: +new Date(),
          title,
          completed: false,
        },
      });

      setTitle('');
      setNotCompletedCount(prev => prev + 1);
    }
  };

  const toggleAllCompleted = () => {
    const newStatus = !isAllCompleted;

    setIsAllCompleted(newStatus);

    dispatch({
      type: 'updateAll',
      payload: { newStatus },
    });
  };

  const handleDeleteCompleted = () => {
    dispatch({ type: 'deleteCompleted' });
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
              onChange={toggleAllCompleted}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList todos={todos} />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${notCompletedCount} items left`}
            </span>

            <TodosFilter filter={filter} setFilter={setFilter} />
            {completedCount > 0 && (
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
