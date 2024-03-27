import { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from './todosContext';
import { ActiveContext, AllContext, CompletedContext } from './filterContext';
import { ManageCheckboxContext } from './manageCheckboxContext';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type ItemProps = {
  item: Todo;
};

export const TodoItem: React.FC<ItemProps> = ({ item }) => {
  const [lableValue, setLableValue] = useState(item.title);
  const [eventLableValue, setEventLableValue] = useState(lableValue);
  const [destroy, setDestroy] = useState(false);
  const [editing, setEditing] = useState(false);

  const { setIsChecked } = useContext(ManageCheckboxContext);
  const { todos, setTodos } = useContext(TodosContext);
  const { isAllSelected } = useContext(AllContext);
  const { isActiveSelected } = useContext(ActiveContext);
  const { isCompletedSelected } = useContext(CompletedContext);

  const todosCopy = [...todos];
  const findIndex = todos.findIndex(element => element.id === item.id);

  const changePersonalComplete = () => {
    return todos.map(elem => {
      if (elem.id === item.id) {
        return {
          ...elem,
          completed: !item.completed,
        };
      }

      return elem;
    });
  };

  if (todos.every(element => element.completed === true)) {
    setIsChecked(true);
  } else {
    setIsChecked(false);
  }

  const handleDestroyButton = () => {
    todosCopy.splice(findIndex, 1);
    setTodos(todosCopy);
    setDestroy(true);
  };

  const toRender = () => {
    if (isAllSelected === true && destroy === false) {
      return true;
    } else if (
      isActiveSelected === true &&
      destroy === false &&
      item.completed === false
    ) {
      return true;
    } else if (
      isCompletedSelected === true &&
      destroy === false &&
      item.completed === true
    ) {
      return true;
    } else {
      return;
    }
  };

  const onSubmitChanges = () => {
    if (eventLableValue.trim() !== '') {
      setEditing(false);
      setLableValue(eventLableValue);
    } else {
      setDestroy(true);
      todosCopy.splice(findIndex, 1);
      setTodos(todosCopy);
    }
  };

  const handleEscape = () => {
    setEditing(false);
    setLableValue(lableValue);
    setEventLableValue(lableValue);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventLableValue(event.target.value);
  };

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmitChanges();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      handleEscape();
    }
  };

  const handleOnBlure = () => {
    onSubmitChanges();
  };

  const editElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editElement.current && editing) {
      editElement.current.focus();
    }
  }, [editing]);

  return (
    <>
      {toRender() === true && (
        <li
          className={`${editing === true && 'editing'} ${item.completed === true && 'completed'}`}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={item.completed}
              onChange={() => setTodos(changePersonalComplete())}
            />
            <label onDoubleClick={() => setEditing(true)}>{lableValue}</label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={handleDestroyButton}
            />
          </div>
          <input
            type="text"
            className="edit"
            value={eventLableValue}
            onKeyUp={handleOnKeyUp}
            onChange={handleOnChange}
            onBlur={handleOnBlure}
            ref={editElement}
          />
        </li>
      )}
    </>
  );
};
