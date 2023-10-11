import classNames from 'classnames';
import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../stores/TodosContext';
import { Todo } from '../types/Todo';

export const TodoItem: React.FC<Todo> = ({ title, completed, id }) => {
  const { lsTodos, setLsTodos } = useContext(TodosContext);
  const [editable, setEditable] = useState(false);
  const index = lsTodos.findIndex((todo: { id: number; }) => todo.id === id);
  const [currentTitle, setCurrentTitle] = useState(title);
  const editInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editInput.current && currentTitle) {
      editInput.current.focus();
    }
  }, [editable]);

  function toggleCompleted() {
    setLsTodos((prev: Todo[]) => {
      const newTodos = [...prev];

      newTodos[index].completed = !completed;

      return newTodos;
    });
  }

  function removeItem() {
    setLsTodos((prev: Todo[]) => {
      const newTodos = [...prev];

      newTodos.splice(index, 1);

      return newTodos;
    });
  }

  function editTodo() {
    setEditable(false);

    if (!currentTitle) {
      removeItem();

      return;
    }

    setLsTodos((prev: Todo[]) => {
      const newTodos = [...prev];

      const newTodo = {
        id,
        completed,
        title: currentTitle,
      };

      newTodos.splice(index, 1, newTodo);

      return newTodos;
    });
  }

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      setCurrentTitle(title);
      editInput.current?.blur();

      return;
    }

    if (e.key === 'Enter' && editInput.current) {
      editTodo();

      editInput.current.blur();
    }
  }

  return (
    <li className={classNames({
      completed: completed === true,
      editing: editable === true,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={toggleCompleted}

        />
        <label onDoubleClick={() => setEditable(true)}>{currentTitle}</label>

        <button
          aria-label="Remove Todo"
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={removeItem}
        />
      </div>
      <input
        ref={editInput}
        type="text"
        className="edit"
        value={currentTitle}
        onChange={(e => setCurrentTitle(e.target.value))}
        onBlur={editTodo}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
