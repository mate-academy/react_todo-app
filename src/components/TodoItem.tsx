import React, {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from '../TodosContext';

type Props = {
  item: Todo,
};
export const TodoItem: React.FC<Props> = ({ item }) => {
  const { todos, setTodos, setIsToggleCheckedAll } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);

  const selectedTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedTodo.current) {
      selectedTodo.current.focus();
    }
  }, [isEditing]);

  const removeTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);

    setTodos(newTodos);
    setIsToggleCheckedAll(newTodos.every(todo => todo.completed));
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo => (
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));

    setTodos(newTodos);
    setIsToggleCheckedAll(newTodos.every(todo => todo.completed));
  };

  const handleDoubleClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);

    if (!title.trim()) {
      removeTodo(item.id);

      return;
    }

    setTodos(todos.map(todo => (
      todo.id === item.id
        ? { ...todo, title: title.trim() }
        : todo
    )));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        setIsEditing(false);
        setTitle(item.title);
        break;

      case 'Enter':
        handleBlur();
        break;

      default:
        break;
    }
  };

  return (
    <li
      className={cn({
        completed: item.completed,
        editing: isEditing,
      })}
      onDoubleClick={handleDoubleClick}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={item.completed}
          onChange={() => toggleTodo(item.id)}
        />
        <label>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete Todo"
          onClick={() => removeTodo(item.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        ref={selectedTodo}
        onKeyUp={handleKeyUp}
        onBlur={handleBlur}
      />
    </li>
  );
};
