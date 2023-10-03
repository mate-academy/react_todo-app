import React, { useEffect, useState, useContext } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { Todo } from './types/Todo';
import { TodosContext } from './TodosContext';

export const App: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [filteredBy, setFilteredBy] = useState('');
  const [title, setTitle] = useState('');
  const numberOfNotCompleted = todos.filter(item => !item.completed).length;
  const [toggleAll, setToggleAll] = useState(false);

  useEffect(() => {
    setToggleAll(numberOfNotCompleted === 0 && todos.length !== 0);
  }, [numberOfNotCompleted]);

  const handleToggleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    })));

    setToggleAll(!toggleAll);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      return;
    }

    addTodo({
      id: todos.length,
      title,
      completed: false,
    });

    setTitle('');
  };

  const handleClearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
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
            value={title}
            onChange={handleTitleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit(e);
              }
            }}
          />
        </form>
      </header>

      <section className="main">
        {(todos.length !== 0) && (
          <div>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={toggleAll}
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </div>
        )}

        {todos.length !== 0 && (
          <TodoList
            filteredBy={filteredBy}
          />
        )}
      </section>

      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${numberOfNotCompleted} item${numberOfNotCompleted !== 1 ? 's' : ''} left`}
          </span>

          <TodosFilter setFilteredBy={setFilteredBy} />

          {(todos.length !== numberOfNotCompleted) && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
