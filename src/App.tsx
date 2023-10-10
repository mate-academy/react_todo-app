/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
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
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const generateId = (todoslist: Todo[] | undefined): number => {
    if (todoslist && todoslist.length > 0) {
      const existingIds = todoslist.map(item => item.id || 0);
      const maxId = Math.max(...existingIds);

      return maxId + 1;
    }

    return 1;
  };

  const handleTodoChange = (index: number, newName: string) => {
    const updatedTodos = [...todos];

    updatedTodos[index].name = newName;
    setTodos(updatedTodos);
  };

  const handleDoubleClick = (index: number) => {
    const selectedTodo = todos[index];

    if (selectedTodo && selectedTodo.name) {
      setChangedElement(selectedTodo.name);
      setEditIndex(index);
      setIsEditing(true);
    }
  };

  const handleImputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={handleImputChange}
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
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              onDoubleClick={() => handleDoubleClick(index)}
              className={cl({ editing: editIndex === index })}
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
              {editIndex === index && isEditing && (
                <input
                  type="text"
                  className="edit"
                  value={changedElement || ''}
                  onChange={(event) => setChangedElement(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      handleTodoChange(index, changedElement);
                      setIsEditing(false);
                    }
                  }}
                  onBlur={() => {
                    handleTodoChange(index, changedElement);
                    setIsEditing(false);
                  }}
                />
              )}
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
