import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setIsEditingTitle] = useState(todo.title);

  const currentEditingTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentEditingTodo.current) {
      currentEditingTodo.current.focus();
    }
  }, [isEditing]);

  const handleDeleteTodo = () => {
    setTodos(todos.filter(currTodo => currTodo.id !== todo.id));
  };

  const handleEditTodos = () => {
    setIsEditing(true);
  };

  const handleCompletedTodo = () => {
    const copyTodos = [...todos];

    const indexOfUpdatedTodo = copyTodos
      .findIndex(currTodo => currTodo.id === todo.id);

    if (indexOfUpdatedTodo !== -1) {
      const todoToChange = copyTodos[indexOfUpdatedTodo];

      const updTodo = {
        ...todoToChange,
        completed: !todoToChange.completed,
      };

      copyTodos.splice(indexOfUpdatedTodo, 1, updTodo);

      setTodos(copyTodos);
    }
  };

  const updateTodo = () => {
    const copyTodos = [...todos];

    const indexOfUpdatedTodo = copyTodos
      .findIndex(currTodo => currTodo.id === todo.id);

    if (indexOfUpdatedTodo !== -1) {
      const todoToChange = copyTodos[indexOfUpdatedTodo];

      if (editingTitle.trim()) {
        const updTodo = {
          ...todoToChange,
          title: editingTitle,
        };

        copyTodos.splice(indexOfUpdatedTodo, 1, updTodo);
      } else {
        copyTodos.splice(indexOfUpdatedTodo, 1);
      }

      setTodos(copyTodos);
    }

    setIsEditing(false);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateTodo();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
      setIsEditingTitle(todo.title);
    }
  };

  const { id, title, completed } = todo;

  return (
    <li className={cn({
      completed,
      editing: isEditing,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view${id}`}
          checked={completed}
          onClick={handleCompletedTodo}
        />

        <label
          onDoubleClick={handleEditTodos}
        >
          {title}
        </label>

        <button
          aria-label="delete"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteTodo}
        />
      </div>

      <input
        ref={currentEditingTodo}
        type="text"
        className="edit"
        value={editingTitle}
        onChange={({ target }) => setIsEditingTitle(target.value)}
        onKeyUp={handleKeyUp}
        onBlur={updateTodo}
      />
    </li>
  );
};
