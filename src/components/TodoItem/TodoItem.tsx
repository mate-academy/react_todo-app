import { useContext, useRef, useState } from 'react';
import { Todo } from '../../interfaces/Todo';
import { DispatchContext } from '../../context/TodosContext';
import classNames from 'classnames';

type Props = {
  item: Todo;
};
export const TodoItem: React.FC<Props> = ({ item }) => {
  const dispatch = useContext(DispatchContext);
  const [title, setTitle] = useState(item.title);
  const [focus, setFocus] = useState(false);
  const inputElem = useRef<HTMLInputElement>(null);
  const handleDelete = () => {
    dispatch({ type: 'REMOVE', payload: { id: item.id } });
  };

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE', payload: { id: item.id } });
  };

  const handleBlurElem = () => {
    if (!title.trim().length) {
      return;
    }

    setFocus(false);
    dispatch({ type: 'BLUR', payload: { title: title, id: item.id } });
  };

  const handleButtonChange = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlurElem();
    }

    if (e.key === 'Escape') {
      setTitle(item.title);
      setFocus(false);
    }
  };

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDblClick = () => {
    setFocus(true);
    if (inputElem.current) {
      setTimeout(() => {
        inputElem.current?.focus();
      }, 10);
    }
  };

  return (
    <li
      className={classNames({ completed: item.completed }, { editing: focus })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={handleToggle}
        />
        <label onDoubleClick={handleDblClick}>{item.title}</label>
        <button
          type="button"
          className="destroy"
          onClick={handleDelete}
          data-cy="deleteTodo"
        />
      </div>
      <input
        ref={inputElem}
        value={title}
        onBlur={handleBlurElem}
        onKeyUp={handleButtonChange}
        onChange={changeInputHandler}
        type="text"
        className="edit"
      />
    </li>
  );
};
