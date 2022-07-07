import React, { useContext, useState } from 'react';
import { TodoContext } from '../../TodoContext';

const TodoItem = ({ item, isChecked }) => {
  const { setTodos, todos, getChangeTitle } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [editing, setEditing] = useState(false);

  const updateTodo = (event) => {
    event.preventDefault();
    getChangeTitle(item.id, title);
    setEditing(false);
  };

  const updateTodoKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
        updateTodo(event);
        break;
      case 'Escape':
      case 'Esc':
        setEditing(false);
        setTitle(item.title);
        break;
      default:
        break;
    }
  };

  const handleChangeComplete = () => {
    setTodos(todos.map((todo) => {
      if (todo.id === item.id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }

      return todo;
    }));
  };

  const deleteTodo = () => {
    setTodos(todos.filter(todo => todo.id !== item.id));
  };

  return (
    <li
      key={item.id}
      className={`
        ${editing ? 'editing' : ''}
        ${item.complete ? 'completed' : ''}
      `}
    >
      <div
        className="view"
      >
        <input
          type="checkbox"
          name="check"
          checked={item.complete}
          className="toggle"
          id="toggle-view"
          onChange={handleChangeComplete}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={(event) => {
            setEditing(true);
          }}
        >
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={deleteTodo}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        id={`${item.id}`}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        onBlur={(event) => {
          updateTodo(event);
        }}
        onKeyDown={(event) => {
          updateTodoKeyDown(event);
        }}
      />
    </li>
  );
};

export default TodoItem;
