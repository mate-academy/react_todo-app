import classNames from 'classnames';
import React, {
  FC, FormEvent, useRef, useState,
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

  return (
    <div
      data-cy="Todo"
      className={classNames(
        'todo',
        { completed: todo.completed },
      )}
      onDoubleClick={() => {
        onDoubleClick(index);
        setInputValue(todo.title);
        setIsTodoEditing(true);
        setTimeout(() => {
          if (inputRef) {
            inputRef.current?.focus();
          }
        }, 0);
      }}
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
          onClick={() => {
            setClickedIndex(index);
            handleToggleTodo(todo.id);
          }}
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
          {todo.title}
        </span>
      )}

      <button
        type="button"
        className={classNames(
          'todo__remove',
          { hidden: isTodoEditing && index === clickedIndex },
        )}
        data-cy="TodoDeleteButton"
        onClick={() => {
          setClickedIndex(index);
          deleteTodoHandler(todo.id);
        }}
      >
        ×
      </button>
    </div>
  );
};
