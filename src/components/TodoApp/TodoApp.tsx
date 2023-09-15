import React, { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../../TodosContext';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(Status.All);

  const {
    todos,
    addTodo,
    toggleAll,
    clearCompleted,
  } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo(title);
    setTitle('');
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  function filterTodos(items: Todo[], status: Status) {
    switch (status) {
      case Status.Active:
        return items.filter(item => !item.completed);

      case Status.Completed:
        return items.filter(item => item.completed);

      case Status.All:
      default:
        return items;
    }
  }

  const notCompletedTodos = todos.filter(item => !item.completed).length;

  const filteredTodos = useMemo(() => {
    return filterTodos(todos, selectedStatus);
  }, [todos, selectedStatus]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={handleTitle}
          />
        </form>
      </header>

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleAll}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList items={filteredTodos} />

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {notCompletedTodos === 1
                  ? '1 item left'
                  : `${notCompletedTodos} items left`}
              </span>

              <TodosFilter
                selectedFilter={selectedStatus}
                setSelectedFilter={setSelectedStatus}
              />

              {notCompletedTodos < filteredTodos.length && (
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
        )}
      </section>

    </div>
  );
};
