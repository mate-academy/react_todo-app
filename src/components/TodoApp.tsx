import React, { useContext, useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';
import { Filter, Status } from '../types/Filters';

const filters: Filter[] = [
  { href: '/', title: Status.All },
  { href: '/active', title: Status.Active },
  { href: '/completed', title: Status.Completed },
];

export const TodoApp: React.FC = () => {
  const {
    todos,
    setTodos,
    completedTodos,
    uncompletedTodos,
    onToggleAll,
  } = useContext(TodosContext);

  const [title, setTitle] = useState('');
  const [filterBy, setFilterBy] = useState(Status.All);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const newTodo: Todo = {
    id: +new Date(),
    title: title.trim(),
    completed: false,
  };

  const renderedTodos = {
    [Status.All]: todos,
    [Status.Active]: uncompletedTodos,
    [Status.Completed]: completedTodos,
  };

  const onEdit = (todo: Todo | null) => {
    setSelectedTodo(todo);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.title && !newTodo.title.startsWith(' ')) {
      setTodos([...todos, newTodo]);
      setTitle('');
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(event) => setTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              checked={todos.length === completedTodos.length}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={onToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={renderedTodos[filterBy]}
              selectedTodo={selectedTodo}
              onEdit={onEdit}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedTodos.length} items left`}
            </span>

            <TodosFilter
              filters={filters}
              filterBy={filterBy}
              onFilterBy={setFilterBy}
            />

            {completedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodos(uncompletedTodos)}
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
