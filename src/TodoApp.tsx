import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Todo } from './Todo';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';
import { Filters } from './Filters';

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [filtered, setFiltered] = useState<Filters>(Filters.All);
  const { filter } = useParams();

  useEffect(() => {
    let filterParam;

    switch (filter) {
      case 'active': filterParam = Filters.Active;
        break;
      case 'completed': filterParam = Filters.Completed;
        break;
      default: filterParam = Filters.All;
        break;
    }

    setFiltered(filterParam);
  }, [filtered, filter]);

  const filteredTodos = useMemo(() => {
    let newTodos = todos;

    switch (filtered) {
      case 'Active':
        newTodos = newTodos.filter(todo => !todo.completed);
        break;
      case 'Completed':
        newTodos = newTodos.filter(todo => todo.completed);
        break;
      case 'All':
        newTodos = todos;
        break;
      default: throw new Error('wrong filters');
    }

    return newTodos;
  }, [filtered, todos, filter]);

  const handleCreateTodo = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos(prevState => [...prevState, newTodo]);
    setTitle('');
  };

  const handleToggle = (id: number) => {
    const toggleId = todos.filter(todo => todo.id === id)[0];
    const changeTodo = {
      id,
      title: toggleId.title,
      completed: !toggleId.completed,
    };

    setTodos(prevState => [...prevState
      .filter(todo => todo.id !== id), changeTodo].sort((a, b) => a.id - b.id));
  };

  const handleAllToggle = () => {
    const newTodos = todos.find(todo => !todo.completed)
      ? todos.map(todo => {
        const toggleTodo = {
          id: todo.id,
          title: todo.title,
          completed: true,
        };

        return toggleTodo;
      })
      : todos.map(todo => {
        const toggleTodo = {
          id: todo.id,
          title: todo.title,
          completed: false,
        };

        return toggleTodo;
      });

    setTodos(newTodos);
  };

  const handleDeleteTodo = (deleteId: number) => {
    const newTodos = todos.filter(todo => todo.id !== deleteId);

    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const editTitle = (editById: number, tempTitle: string) => {
    const editTodo = todos.find(todo => todo.id === editById);

    if (editTodo) {
      const creatingEdtion = {
        id: editTodo.id,
        title: tempTitle,
        completed: editTodo.completed,
      };

      setTodos(prevState => [...prevState
        .filter(todo => todo.id !== editById), creatingEdtion]
        .sort((a, b) => a.id - b.id));
    }
  };

  useEffect(() => {
    const loadTodos = localStorage.getItem('todos');

    if (loadTodos) {
      setTodos(JSON.parse(loadTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const notCompleted = todos.filter(todo => !todo.completed).length;
  const isButtonCompleted = todos.length !== notCompleted;

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={(event) => handleCreateTodo(event)}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={handleAllToggle}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={filteredTodos}
          handleToggle={handleToggle}
          handleDeleteTodo={handleDeleteTodo}
          editTitle={editTitle}
        />
      </section>

      {todos.length > 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${notCompleted} items left`}
          </span>

          <TodoFilter setFiltered={setFiltered} filtered={filtered} />
          <button
            type="button"
            className="clear-completed"
            style={{ visibility: isButtonCompleted ? 'visible' : 'hidden' }}
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      )}
    </div>
  );
};
