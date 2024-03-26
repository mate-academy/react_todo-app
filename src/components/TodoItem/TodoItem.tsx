import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/todo';
import { TodosContext } from '../todosContext';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { items, setItems } = useContext(TodosContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement | null>(null);

  const deleteItemClick = (itemId: number) => {
    setItems(items.filter(el => el.id !== itemId));
  };

  const handleToggleCompleted = (todoId: number) => {
    const newItems = items.map(el => {
      if (el.id === todoId) {
        return {
          ...el,
          completed: !el.completed,
        };
      }

      return el;
    });

    setItems(newItems);
  };

  const handleNewTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleNewTodos = useCallback(() => {
    setItems(
      items.map(prevItem => {
        if (prevItem.id === todo.id) {
          return {
            ...prevItem,
            title: newTitle,
          };
        }

        return prevItem;
      }),
    );
    setIsEdit(false);
  }, [todo, items, newTitle, setItems]);

  const deleteEmptyItem = useCallback(() => {
    setItems(items.filter(prevItem => prevItem.id !== todo.id));
    setIsEdit(false);
  }, [todo, items, setItems]);

  const handleKeyUpEvent = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setNewTitle(todo.title);
      setIsEdit(false);
    } else if (event.key === 'Enter' && newTitle.trim()) {
      handleNewTodos();
    } else if (event.key === 'Enter' && !newTitle.trim()) {
      deleteEmptyItem();
    }
  };

  const handleBlur = () => {
    if (newTitle.trim()) {
      handleNewTodos();
    } else {
      deleteEmptyItem();
    }
  };

  useEffect(() => {
    if (titleField.current && isEdit) {
      titleField.current.focus();
    }
  }, [isEdit]);

  const handleDoubleClick = () => {
    setIsEdit(true);
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: isEdit,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          {...{ checked: todo.completed }}
          onChange={() => handleToggleCompleted(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={() => deleteItemClick(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        ref={titleField}
        onChange={handleNewTitle}
        onKeyUp={handleKeyUpEvent}
        onBlur={handleBlur}
      />
    </li>
  );
};
