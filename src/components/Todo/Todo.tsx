import classNames from 'classnames';
import React, {
  FC, FormEvent, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../../types/Todo';
import { EditForm } from './EditForm';

type Props = {
  isCurrentClicked: boolean,
  todo: Todo,
  visibleTodos: Todo[],
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  clickedIndex: number,
  setClickedIndex: React.Dispatch<React.SetStateAction<number>>
  index: number,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
};

export const TodoComponent: FC<Props> = ({
  isCurrentClicked,
  todo,
  todos,
  visibleTodos,
  setVisibleTodos,
  clickedIndex,
  setClickedIndex,
  index,
  setTodos,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isTodoEditing, setIsTodoEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {
    title,
    completed,
    id,
  } = todo;

  function updateCompletedStatus(
    prev: Todo[],
    todoId: number,
  ) {
    const updatedArray = prev.map(el => {
      const currentTodo = el;

      if (todoId === el.id) {
        currentTodo.completed = !el.completed;
      }

      return currentTodo;
    });

    return updatedArray;
  }

  const handleToggleTodo = (todoId: number) => {
    const clickedTodo = visibleTodos.find(x => x.id === todoId);

    if (clickedTodo) {
      setTodos(updateCompletedStatus(todos, todoId));
    }
  };

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  const deleteTodoHandler = (todoId: number) => {
    setVisibleTodos(prev => {
      return prev.filter(el => el.id !== todoId);
    });

    setTodos(prev => {
      return prev.filter(el => el.id !== todoId);
    });
  };

  const onDoubleClick = (i: number) => {
    setIsTodoEditing(true);
    setClickedIndex(i);
  };

  const onEditSubmit = (
    event: FormEvent<HTMLFormElement>,
    todoId: number,
    todoCompleted: boolean,
  ) => {
    event.preventDefault();

    const clickedTodoTitle = visibleTodos.find(currentTodo => {
      return currentTodo.id === todoId;
    })?.title;

    if (inputRef.current?.value.length === 0) {
      setTodos((prev: Todo[]) => {
        return prev.filter(el => el.id !== todoId);
      });

      return;
    }

    if (inputValue === clickedTodoTitle) {
      inputRef.current?.blur();

      return;
    }

    if (inputRef.current) {
      setTodos((prev: Todo[]) => {
        return prev.map(el => {
          const currentTodo = el;

          if (el.id === todoId && inputRef.current) {
            currentTodo.title = inputRef.current.value.trim();
            currentTodo.completed = todoCompleted;
          }

          return currentTodo;
        });
      });
    }
  };

  const onToggleTodo = () => {
    setClickedIndex(index);
    handleToggleTodo(id);
  };

  const onDeleteTodo = () => {
    setClickedIndex(index);
    deleteTodoHandler(id);
  };

  let focusTimeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

  const handleDoubleClick = () => {
    onDoubleClick(index);
    setInputValue(title);
    setIsTodoEditing(true);

    focusTimeout = setTimeout(() => {
      if (inputRef) {
        inputRef.current?.focus();
      }
    }, 0);
  };

  useEffect(() => {
    return () => clearTimeout(focusTimeout);
  }, []);

  return (
    <li
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed },
      )}
      onDoubleClick={handleDoubleClick}
    >
      <label className={classNames(
        'todo__status-label',
        { hidden: isTodoEditing && isCurrentClicked },
      )}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onClick={onToggleTodo}
        />
      </label>

      {isTodoEditing && index === clickedIndex ? (
        <EditForm
          onEditSubmit={onEditSubmit}
          todo={todo}
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputRef={inputRef}
          setIsTodoEditing={setIsTodoEditing}
          onKeyDownHandler={onKeyDownHandler}
        />
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {title}
        </span>
      )}

      <button
        type="button"
        className={classNames(
          'todo__remove',
          { hidden: isTodoEditing && index === clickedIndex },
        )}
        data-cy="TodoDeleteButton"
        onClick={onDeleteTodo}
      >
        ×
      </button>
    </li>
  );
};
