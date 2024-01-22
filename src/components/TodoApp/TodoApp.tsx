import { useContext, useEffect, useState } from 'react';
import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const [itemTitle, setItemTitle] = useState('');
  const {
    todos,
    setTodos,
  } = useContext(TodosContext);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const footerActive = todos.length > 0;

  const handleToggleAll = () => {
    if (todos.every((todo) => todo.completed === true)) {
      setTodos(todos.map((todo) => {
        return { ...todo, completed: false };
      }));
    } else {
      setTodos(todos.map((todo) => {
        return { ...todo, completed: true };
      }));
    }

    setFilteredTodos(todos);
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => todo.completed === false));
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newItem = {
      id: +new Date(),
      title: itemTitle,
      completed: false,
    };

    if (e.key === 'Enter') {
      e.preventDefault();
      setTodos([...todos, newItem]);
      setItemTitle('');
    }
  };

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

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
            value={itemTitle}
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
            onKeyDown={handleAddTodo}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={handleToggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={filteredTodos} />
      </section>

      {footerActive && (
        <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {todos.filter((todo) => todo.completed === false).length}
          &nbsp;items left
        </span>

        <TodosFilter
          setFilteredTodos={setFilteredTodos}
        />

        <button
          type="button"
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      </footer>
      )}
    </div>
  );
};
