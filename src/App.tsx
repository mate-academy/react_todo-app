/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef } from 'react';
import cl from 'classnames';

type Todo = {
  id?: number;
  name?: string;
  completed?: boolean;
};

// const todoList: Todo[] = [];

export const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [changedElement, setChangedElement] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const generateId = (todoslist: Todo[] | undefined): number => {
    if (todoslist && todoslist.length > 0) {
      const existingIds = todoslist.map(item => item.id || 0);
      const maxId = Math.max(...existingIds);

      return maxId + 1;
    }

    return 1;
  };

  const handleTodoChange = () => {
    let updatedTodos = [...todos];

    updatedTodos = updatedTodos.map(elem => {
      if (elem.id === editId) {
        return { ...elem, name: changedElement };
      }

      return elem;
    });

    setTodos(updatedTodos);
  };

  const handleDoubleClick = (id: number | undefined) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const selectedTodo = todos.find(elem => elem.id === id);

    if (selectedTodo && selectedTodo.name) {
      setChangedElement(selectedTodo.name);
      if (id) {
        setEditId(id);
      }
    }
  };

  const handleAddTodo = (event:React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      setTodos([
        ...todos,
        {
          id: generateId(todos),
          name: inputText.trim(),
          completed: false,
        },
      ]);
      setInputText('');
    }
  };

  const handleDeleteTodo = (todo: Todo) => {
    const updatedTodos = todos.filter(item => item.id !== todo.id);

    setTodos(updatedTodos);
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
            value={inputText}
            onChange={handleAddTodo}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list" data-cy="todoList">
          {todos.map((todo) => (
            <li
              key={todo.id}
              onDoubleClick={() => handleDoubleClick(todo.id)}
              className={cl({ editing: editId === todo.id })}
            >
              <div className="view">
                <input type="checkbox" className="toggle" id="toggle-view" />
                <label htmlFor="toggle-view">{todo.name}</label>
                <button
                  type="button"
                  className="destroy"
                  data-cy="deleteTodo"
                  onClick={() => handleDeleteTodo(todo)}
                />
              </div>
              <input
                type="text"
                className="edit"
                value={changedElement || ''}
                onChange={(event) => {
                  setChangedElement(event.target.value);
                  handleTodoChange();
                }}
                ref={inputRef}
              />
            </li>
          ))}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          3 items left
        </span>

        <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul>

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
