/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useState, useRef, useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from '../contexts/TodosContext';

type Props = {
  todo: Todo;
};

enum TodoStatus {
  View = 'view',
  Editing = 'editing',
  Completed = 'completed',
}

enum ToggleStatus {
  View = 'toggle-view',
  Editing = 'toggle-editing',
  Completed = 'toggle-completed',
}

type InitialStatus = {
  input: TodoStatus,
  toggle: ToggleStatus,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const initialStatus = {
    input: todo.completed ? TodoStatus.Completed : TodoStatus.View,
    toggle: todo.completed ? ToggleStatus.Completed : ToggleStatus.View,
  };

  const { todos, setTodos } = useContext(TodosContext);
  const [todoStatus, setTodoStatus] = useState<InitialStatus>(initialStatus);
  const [newTitle, setNewTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  const { id, title } = todo;

  const handleTodoDelete = (todoId: number) => {
    const filteredTodos
      = todos.filter(currentTodo => currentTodo.id !== todoId);

    setTodos(filteredTodos);
  };

  const handleToggle = () => {
    const modifiedTodos = todos.map(currentTodo => {
      if (currentTodo.id === todo.id) {
        return {
          ...currentTodo,
          completed: !currentTodo.completed,
        };
      }

      return currentTodo;
    });

    setTodos(modifiedTodos);
  };

  const handleDoubleClick = () => {
    setTodoStatus({
      input: TodoStatus.Editing,
      toggle: ToggleStatus.Editing,
    });

    setTimeout(() => {
      editInputRef.current?.focus();
    }, 1);
  };

  const saveChanges = (titleToSet: string) => {
    if (!titleToSet) {
      const modifiedTodos = todos
        .filter(currentTodo => currentTodo.id !== todo.id);

      setTodos(modifiedTodos);
    } else {
      const modifiedTodos = todos.map(currentTodo => {
        if (currentTodo.id === todo.id) {
          return {
            ...currentTodo,
            title: titleToSet,
          };
        }

        return currentTodo;
      });

      setTodos(modifiedTodos);
    }
  };

  const discardChanges = () => {
    setNewTitle(todo.title);
  };

  const handleOnBlur = () => {
    saveChanges(newTitle);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOnBlur();
    }

    if (e.key === 'Escape') {
      discardChanges();
      handleOnBlur();
    }
  };

  useEffect(() => {
    setTodoStatus({
      input: todo.completed ? TodoStatus.Completed : TodoStatus.View,
      toggle: todo.completed ? ToggleStatus.Completed : ToggleStatus.View,
    });
  }, [todo]);

  return (
    <li className={todoStatus.input}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={todoStatus.toggle}
          onChange={handleToggle}
          checked={todo.completed}
        />
        <label
          onDoubleClick={handleDoubleClick}
        >
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleTodoDelete(id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitle}
        onBlur={handleOnBlur}
        onKeyUp={handleKeyUp}
        onChange={e => setNewTitle(e.target.value)}
        ref={editInputRef}
      />
    </li>
  );
};
