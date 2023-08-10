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
  const { setTodo, setToggleAll } = useContext(TodoContext);
  const [editTodo, setEditTodo] = useState(false);
  const [replaceTodo, setReplaceTodo] = useState(items.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editTodo]);

  const handleCompleteTodo = () => {
    setTodo(currentTodos => {
      const newTodos = currentTodos.map(todoItem => (
        items.id === todoItem.id
          ? { ...todoItem, completed: !items.completed }
          : todoItem
      ));

      const completedAllTodos = newTodos
        .filter(todoItem => !todoItem.completed);

      if (completedAllTodos.length < 1) {
        setToggleAll(true);
      } else {
        setToggleAll(false);
      }

      return newTodos;
    });
  };

  const handleDeleteTodo = () => {
    setTodo(currentTodos => currentTodos.filter(
      todoItem => todoItem.id !== items.id,
    ));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReplaceTodo(event.target.value);
  };

  const updateTodo = () => {
    if (replaceTodo) {
      setTodo(currentTodos => currentTodos.map(todos => (
        items.id === todos.id
          ? { ...todos, title: replaceTodo }
          : todos
      )));
    }
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
          onClick={handleDeleteTodo}
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
