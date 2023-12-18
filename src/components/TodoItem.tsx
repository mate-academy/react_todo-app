import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../context/TodosContext';
import { Key } from '../types/Key';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editingTodo, setEditingTodo] = useState<null | Todo>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const deleteTodo = (taskId: number) => {
    const filteredTasks = todos.filter(task => task.id !== taskId);

    setTodos(filteredTasks);
  };

  const changeStatusCompleted = (taskId: number) => {
    setTodos(todos.map(task => {
      if (task.id === taskId) {
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

  const handleToggleTasks = (taskId: number) => {
    changeStatusCompleted(taskId);
    handleToggleTask(taskId);
  };

  const handleDoubleClick = (task: Todo) => {
    setEditingTodo(task);
  };

  const handleSave = () => {
    if (editingTodo) {
      const newTitle = editingTodo.title.trim();

      if (newTitle) {
        setTodos(todos.map(task => {
          if (task.id === editingTodo.id) {
            return { ...task, title: newTitle };
          }

          return task;
        }));
      } else {
        deleteTodo(editingTodo.id);
      }
    }

    setEditingTodo(null);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingTodo) {
      setEditingTodo({
        ...editingTodo,
        title: event.target.value,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === Key.Escape) {
      setEditingTodo(null);
    }

    if (event.key === Key.Enter) {
      handleSave();
    }
  };

  useEffect(() => {
    if (editingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodo]);

  const { id, title, completed } = todo;

  return (
    <li
      className={classNames({
        completed,
        editing: editingTodo?.id === id,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          id={`toggle-view-${id}`}
          onChange={() => handleToggleTasks(id)}
        />

        <label
          onDoubleClick={() => handleDoubleClick(todo)}
        >
          {title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Save"
          onClick={() => deleteTodo(id)}
        />
      </div>

      {editingTodo?.id === id && (
        <input
          type="text"
          className="edit"
          value={editingTodo.title}
          onChange={handleChangeTitle}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      )}
    </li>
  );
};
