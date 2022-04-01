import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [completedTodos, setCompletedTodos] = useState<number[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState('all');
  const filter = {
    all: () => {
      setVisibleTodos(todos);
      setActiveFilter('all');
    },
    active: () => {
      setVisibleTodos(todos.filter(todo => !completedTodos.includes(todo.id)));
      setActiveFilter('active');
    },
    completed: () => {
      setVisibleTodos(todos.filter(todo => completedTodos.includes(todo.id)));
      setActiveFilter('completed');
    },
  };

  const handleToggleAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCompletedTodos(todos.map(todo => todo.id));
    }

    if (!event.target.checked) {
      setCompletedTodos([]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = {
      id: Math.random(),
      title: newTodoTitle,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const handleClearAll = () => {
    const filteredTodos = todos.filter(todo => !completedTodos.includes(todo.id));

    setTodos(filteredTodos);
    setCompletedTodos(completedTodos.filter(id => filteredTodos.some(todo => todo.id === id)));
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
            onChange={(event) => setNewTodoTitle(event.target.value)}
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
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
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
