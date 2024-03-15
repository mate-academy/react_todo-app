import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo';
import { TodosContext } from '../todosContext';

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { items, setItems } = useContext(TodosContext);
  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const titleField = useRef<HTMLInputElement | null>(null);

  const deleteItemClick = useCallback(
    (itemId: number) => {
      setItems(items.filter(el => el.id !== itemId));
    },
    [items, setItems],
  );

  const handleToggleCompleted = useCallback(
    (todoId: number) => {
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
    },
    [items, setItems],
  );

  const handleNewTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(event.target.value);
    },
    [setNewTitle],
  );

  const handleNewTodos = useCallback(() => {
    setItems(
      items.map(prevItem => {
        if (prevItem.id === item.id) {
          return {
            ...prevItem,
            title: newTitle,
          };
        }

        return prevItem;
      }),
    );
    setIsEdit(false);
  }, [item, items, newTitle, setItems]);

  const deleteEmptyItem = useCallback(() => {
    setItems(items.filter(prevItem => prevItem.id !== item.id));
    setIsEdit(false);
  }, [item, items, setItems]);

  const handleKeyUpEvent = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNewTitle(item.title);
        setIsEdit(false);
      } else if (event.key === 'Enter' && newTitle.trim()) {
        handleNewTodos();
      } else if (event.key === 'Enter' && !newTitle.trim()) {
        deleteEmptyItem();
      }
    },
    [deleteEmptyItem, handleNewTodos, newTitle, item],
  );

  const handleBlur = useCallback(() => {
    if (newTitle.trim()) {
      handleNewTodos();
    } else {
      deleteEmptyItem();
    }
  }, [deleteEmptyItem, handleNewTodos, newTitle]);

  useEffect(() => {
    if (titleField.current && isEdit) {
      titleField.current.focus();
    }
  }, [isEdit]);

  return (
    <li
      className={cn({
        completed: item.completed,
        editing: isEdit,
      })}
      onDoubleClick={() => setIsEdit(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={item.completed}
          onChange={() => handleToggleCompleted(item.id)}
        />
        <label>{item.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={() => deleteItemClick(item.id)}
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
