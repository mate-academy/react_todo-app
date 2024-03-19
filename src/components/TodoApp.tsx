import { useEffect, useState } from 'react';

import TodoList from './TodoList';
import TodosFilter from './TodosFilter';
import { Todo } from '../types/Todo';
import { Status } from '../enums/Status';
import { Action } from '../enums/Action';
import { useTodosContext } from '../hooks/useTodosContext';

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
  const { todos, updateTodos } = useTodosContext();

  const [title, setTitle] = useState('');
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [filter, setFilter] = useState(Status.All);

  const notCompletedCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - notCompletedCount;

  useEffect(() => {
    setIsAllCompleted(completedCount === todos.length);
  }, [todos, completedCount]);

  const preparedTodos = filteredTodos(todos, filter);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim()) {
      updateTodos({
        type: Action.Create,
        payload: {
          id: +new Date(),
          title,
          completed: false,
        },
      });

      setTitle('');
    }
  };

  const toggleAllCompleted = () => {
    const newStatus = !isAllCompleted;

    setIsAllCompleted(newStatus);

    updateTodos({
      type: Action.UpdateAll,
      payload: { newStatus },
    });
  };

  const handleDeleteCompleted = () => {
    updateTodos({ type: Action.DeleteCompleted });
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

      {todos.length > 0 && (
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

            <TodoList todos={preparedTodos} />
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
