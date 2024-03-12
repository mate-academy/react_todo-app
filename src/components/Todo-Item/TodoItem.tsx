import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todos } from '../../types/types';
import { TodosContext } from '../../TodosContext';

type PropsItem = {
  todo: Todos;
};

export const TodoItem: React.FC<PropsItem> = ({ todo }) => {
  const [listInput, setListInput] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);
  const { handleCompleted, todos, setTodos } = useContext(TodosContext);

  const { id, completed } = todo;

  const handleClickInput = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setListInput(true);
    setEditedText(todo.title);
  };

  const handleDelete = () => {
    const updatedTodos = todos.filter(item => item.id !== todo.id);

    setTodos(updatedTodos);
  };

  const enterInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      setListInput(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(event.target.value);
  };

  const handleEdit = () => {
    const updatedTodos = todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, title: editedText };
      }

      return item;
    });

    setTodos(updatedTodos);
    setListInput(false);
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: listInput,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={id.toString()}
          checked={completed}
          onChange={() => handleCompleted(id)}
        />
        <label htmlFor="toggle-editing" onDoubleClick={handleClickInput}>
          {editedText}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Close"
          onClick={handleDelete}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={editedText}
        onKeyDown={enterInput}
        onBlur={handleEdit}
        onChange={handleChange}
      />
    </li>
  );
};
