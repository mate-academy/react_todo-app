import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';

export const Todo = ({
  todo,
  todos,
  setTodos,
  removeHandler,
}) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [inputQuery, setInputQuery] = useState(title);

  const completeHandler = useCallback(
    (id) => {
      const newTodos = todos.map(todo => (
        todo.id === id ? ({
          ...todo,
          completed: !todo.completed,
        })
          : todo
      ));

      setTodos(newTodos);
    }, [todos],
  );

  const editingHandler = () => {
    setIsDoubleClicked(prev => !prev);
  };

  const changeHandler = (event) => {
    setInputQuery(event.target.value);
  };

  const submitHandler = useCallback(
    (event) => {
      if (event.key === 'Esc') {
        setIsDoubleClicked(false);
        setInputQuery(title);

        return;
      }

      if (event.key === 'Enter' && inputQuery) {
        setTitle(inputQuery);
        setIsDoubleClicked(false);
      }
    }, [title, inputQuery],
  );

  const blurHandler = useCallback(
    (event) => {
      const { target, currentTarget } = event;

      if (inputQuery && currentTarget === target) {
        setTitle(inputQuery);
        setIsDoubleClicked(false);
      }
    }, [inputQuery],
  );

  return (
    <li
      className={className(
        todo.completed ? 'completed' : '',
        isDoubleClicked ? 'editing' : '',
      )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onChange={() => completeHandler(todo.id)}
        />
        <label
          onDoubleClick={() => editingHandler(todo.id)}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          onClick={() => removeHandler(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={inputQuery}
        onChange={changeHandler}
        onKeyPress={submitHandler}
        onBlur={blurHandler}
      />
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  setTodos: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};
