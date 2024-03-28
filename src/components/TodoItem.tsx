import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../type/Todo';
import cn from 'classnames';

type Props = {
  item: Todo;
};
export const TodoItem: React.FC<Props> = ({ item }) => {
  const focusOnEdit = useRef<HTMLInputElement>(null);
  const [idEditing, setIsEditing] = useState<null | Todo>(null);
  const [editValue, setEditValue] = useState(item.title);

  useEffect(() => {
    if (focusOnEdit.current) {
      focusOnEdit.current.focus();
    }
  }, [focusOnEdit, idEditing]);

  const { makeTodoCompleted, deleteTodo, updateTodo } =
    useContext(TodosContext);

  const handleCompleted = () => {
    makeTodoCompleted(item.id, !item.completed);
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateTodo(editValue, item);
      setIsEditing(null);
    }

    if (e.key === 'Escape') {
      setIsEditing(null);
    }
  };

  return (
    <li
      className={cn({
        completed: item.completed,
        editing: idEditing?.id === item.id,
      })}
    >
      <div className="view">
        <input
          key={item.id}
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onChange={handleCompleted}
          checked={item.completed}
        />
        <label onDoubleClick={() => setIsEditing(item)}>{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(item.id)}
        />
      </div>
      <input
        name={item.title}
        ref={focusOnEdit}
        type="text"
        key={item.id}
        value={editValue}
        onChange={e => setEditValue(e.target.value)}
        className="edit"
        onKeyUp={onKeyUp}
        onBlur={() => {
          updateTodo(editValue, item);
          setIsEditing(null);
        }}
      />
    </li>
  );
};
