import { useContext, useEffect, useState } from 'react';
import { Status } from '../../types/enums';
import { TodoList } from '../TodoList';
import { TodosContext } from '../TodosContext/TodosContext';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const {
    todos,
    setTodos,
  } = useContext(TodosContext);
  const [itemTitle, setItemTitle] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const [selected, setSelected] = useState(Status.All);

  const hasTodos = todos.length > 0;
  const completedTodos = todos.some((todo) => todo.completed);

  const handleToggleAll = () => {
    if (todos.every((todo) => todo.completed)) {
      setTodos(todos.map((todo) => {
        return { ...todo, completed: false };
      }));
    } else {
      setTodos(todos.map((todo) => {
        return { ...todo, completed: true };
      }));
    }
  };

  useEffect(() => {
    if (selected === Status.Active) {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (selected === Status.Completed) {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    } else {
      setFilteredTodos(todos);
    }
  }, [filteredTodos, selected, todos]);

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const newItem = {
      id: +new Date(),
      title: itemTitle,
      completed: false,
    };

    if (e.key === 'Enter' && itemTitle.length) {
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

      {hasTodos && (
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
      )}

      {hasTodos && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {todos.filter((todo) => !todo.completed).length}
          &nbsp;items left
          </span>

          <TodosFilter
            selected={selected}
            setSelected={setSelected}
            setFilteredTodos={setFilteredTodos}
          />

          {completedTodos && (
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
