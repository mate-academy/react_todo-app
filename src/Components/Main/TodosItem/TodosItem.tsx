import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import classNames from 'classnames';
import { Todos } from '../../Types';
import { TodoContext } from '../TodosContext';
import { KeyMove } from '../../Enum/KeyMove';

type Props = {
  items: Todos;
};

export const TodosItem: React.FC<Props> = ({ items }) => {
  const { todo, setTodo, setToggleAll } = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState(false);
  const [replaceTodo, setReplaceTodo] = useState(items.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTodo]);

  const handleCompleteTodo = () => {
    const newTodos = (currentTodos: Todos[]) => currentTodos.map(todoItem => (
      items.id === todoItem.id
        ? { ...todoItem, completed: !items.completed }
        : todoItem
    ));

    if (newTodos.length < 1) {
      setToggleAll(true);
    } else {
      setToggleAll(false);
    }

    setTodo(newTodos(todo));
  };

  const handleDeleteTodo = (todos: Todos) => {
    const filterTodos = todo.filter(todoItem => todoItem.id !== todos.id);

    setTodo(filterTodos);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceTodo(event.target.value);
  };

  const updateTodo = () => {
    if (!replaceTodo) {
      setTodo(todo.filter(
        todoItem => todoItem.id !== items.id,
      ));

      return;
    }

    setTodo(todo.map(todos => {
      return items.id === todos.id
        ? { ...todos, title: replaceTodo.trim() }
        : todos;
    }));
  };

  const handleBlur = () => {
    updateTodo();
    setEditTodo(false);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    switch (e.key) {
      case KeyMove.ENTER:
        handleBlur();
        break;

      case KeyMove.ESC:
        setEditTodo(false);
        setReplaceTodo(items.title);
        break;

      default:
        break;
    }
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyMove.ENTER || event.key === KeyMove.ESC) {
      return onKeyUp(event);
    }

    return null;
  };

  return (
    <li
      className={classNames({
        completed: items.completed,
        editing: editTodo,
      })}
      onDoubleClick={() => setEditTodo(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={items.completed}
          onChange={handleCompleteTodo}
        />
        <label>{items.title}</label>
        <button
          type="button"
          aria-label="delete Todo"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(items)}
        />
      </div>
      {editTodo && (
        <input
          type="text"
          className="edit"
          value={replaceTodo}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={inputRef}
          onKeyUp={handleOnKeyUp}
        />
      )}
    </li>
  );
};
