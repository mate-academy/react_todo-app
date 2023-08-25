import { useContext, useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types';
import { TodosContext } from '../TodosContext';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [title, setTitle] = useState(todo.title);
  const [isEditing, setIsEditing] = useState(false);

  const trimmedTitle = title.trim();

  const deleteTodo = (selectedTodo: Todo) => {
    setTodos(todos.filter(t => t !== selectedTodo));
  };

  const onCheckingHandler = () => {
    setTodos(currTodo => (
      currTodo.map(t => (
        todo.id === t.id
          ? ({
            ...todo,
            completed: !todo.completed,
          })
          : t
      ))
    ));
  };

  const doubleClickHandler = () => {
    setIsEditing(true);
  };

  const onBlurHandler = () => {
    setIsEditing(false);

    if (trimmedTitle) {
      setTodos(todos.map(t => (t.id !== todo.id
        ? t
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
      case 'Enter':
        onBlurHandler();
        break;

      case 'Escape':
        setTitle(todo.title);
        setIsEditing(false);
        break;

      default:
        break;
    }
  };

  return (
    <li className={classNames(
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
          htmlFor="toggle-view"
          onDoubleClick={doubleClickHandler}>
          {title}
        </label>
        <button
          type="button"
          aria-label="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onBlur={onBlurHandler}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDownHandler}
      />
    </li>
  );
};
