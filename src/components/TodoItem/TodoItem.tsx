import cn from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import { removeTodo } from '../../services/todo';
import { Todo } from '../../types/Todo';
import { Key } from '../../types/Key';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
  } = todo;

  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const editInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus();
    }
  }, [isEditing]);

  const handleTodoRemoving = () => {
    const newTodos = removeTodo(todos, id);

    setTodos(newTodos);
  };

  const handleTodoChecking = () => {
    const todoIndex = todos.findIndex(chosenTodo => chosenTodo.id === id);
    const todosCopy = [...todos];

    todosCopy[todoIndex].completed = !todosCopy[todoIndex].completed;
    setTodos(todosCopy);
  };

  const handleEditSubmit = () => {
    if (editedTitle.trim()) {
      setTodos(todos.map(todoFromList => {
        if (todoFromList.id === id) {
          return { ...todoFromList, title: editedTitle };
        }

        return todoFromList;
      }));
    } else {
      handleTodoRemoving();
    }

    setIsEditing(false);
  };

  return (
    <li
      className={cn({
        completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={handleTodoChecking}
        />
        <label onDoubleClick={() => setIsEditing(true)}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleTodoRemoving}
        >
          ×
        </button>
      </div>
      <input
        type="text"
        className="edit"
        ref={editInput}
        value={editedTitle}
        onChange={(event) => setEditedTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === Key.Enter) {
            handleEditSubmit();
          }

          if (event.key === Key.Escape) {
            setEditedTitle(title);
            setIsEditing(false);
          }
        }}
        onBlur={handleEditSubmit}
      />
    </li>
  );
};
