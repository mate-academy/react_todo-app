import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/TodosContext';

type PropsTodoItem = {
  todo: Todo
};

export const TodoItem: React.FC<PropsTodoItem> = ({
  todo,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editingTodo, setEditingTodo] = useState<null | Todo>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const deleteTodo = (id: number) => {
    const filteredTasks = todos.filter(task => task.id !== id);

    setTodos(filteredTasks);
  };

  const changeStatusCompleted = (id: number) => {
    setTodos(todos.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }

      return task;
    }));
  };

  const handleToggleTask = (taskId: number) => {
    const updatedTasks = todos.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }

      return task;
    });

    setTodos(updatedTasks);
  };

  const handleDoubleClick = (task: Todo) => {
    setEditingTodo(task);
  };

  const handleSave = () => {
    if (editingTodo) {
      setTodos(todos.map(task => {
        if (task.id === editingTodo.id) {
          return { ...task, title: editingTodo.title };
        }

        return task;
      }));
    }

    setEditingTodo(null);
  };

  const handleChangeTitle = (newTitle: string) => {
    if (editingTodo) {
      setEditingTodo({
        ...editingTodo,
        title: newTitle,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditingTodo(null);
    }

    if (event.key === 'Enter') {
      handleSave();
    }
  };

  useEffect(() => {
    if (editingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodo]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editingTodo?.id === todo.id,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          id={`toggle-view-${todo.id}`}
          onChange={() => {
            changeStatusCompleted(todo.id);
            handleToggleTask(todo.id);
          }}
        />

        <label
          onDoubleClick={() => handleDoubleClick(todo)}
        >
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Save"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      {editingTodo?.id === todo.id && (
        <input
          type="text"
          className="edit"
          value={editingTodo.title}
          onChange={(event) => handleChangeTitle(event.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      )}
    </li>
  );
};
