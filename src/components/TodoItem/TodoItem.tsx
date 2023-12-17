import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Keyboard } from '../../types/Keyboard';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const trimmedTitle = title.trim();

  const deleteTodo = (selectedTodo: Todo) => {
    setTodos(todos.filter(currentTodo => currentTodo !== selectedTodo));
  };

  const onCheckingHandler = () => {
    setTodos(todos.map(selectedTodo => (
      todo.id === selectedTodo.id
        ? ({
          ...todo,
          completed: !todo.completed,
        })
        : selectedTodo
    )));
  };

  const doubleClickHandler = () => {
    setIsEditing(true);
    setIsFocused(true);
  };

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const onBlurHandler = () => {
    setIsEditing(false);
    setIsFocused(false);

    if (trimmedTitle) {
      setTodos(todos.map(currentTodo => (currentTodo.id !== todo.id
        ? currentTodo
        : {
          ...todo,
          title: trimmedTitle,
        }
      )));
    } else {
      deleteTodo(todo);
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case Keyboard.ENTER:
        onBlurHandler();
        break;

      case Keyboard.ESC:
        setTitle(todo.title);
        setIsEditing(false);
        setIsFocused(false);
        break;

      default:
        break;
    }
  };

  return (
    <li className={cn(
      { completed: todo.completed },
      { editing: isEditing },
    )}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={onCheckingHandler}
        />
        <label
          onDoubleClick={doubleClickHandler}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="button"
          onClick={() => deleteTodo(todo)}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={onBlurHandler}
        onKeyDown={onKeyDownHandler}
      />
    </li>
  );
};
