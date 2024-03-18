import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../Types/Todo';
import { TodosContext } from '../Contexts/TodosContext';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleDeleteClick = useCallback((todoId: number) => {
    setTodos(todos.filter((prevTodo) => prevTodo.id !== todoId));
  }, [setTodos, todos]);

  const handleCheckBoxChange = useCallback((todoId: number) => {
    const newTodos = todos.map((prevTodo) => {
      if (prevTodo.id === todoId) {
        return {
          ...prevTodo,
          completed: !prevTodo.completed,
        };
      }

      return prevTodo;
    });

    setTodos(newTodos);
  }, [setTodos, todos]);

  const handleTitleChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  }, [setTodoTitle]);

  const saveTitleChanges = useCallback(() => {
    setTodos((todos.map(prevTodo => {
      if (prevTodo.id === todo.id) {
        return {
          ...prevTodo,
          title: todoTitle,
        };
      }

      return prevTodo;
    })));
    setIsEditing(false);
  }, [setTodos, todos, todoTitle, todo]);

  const deleteEmptyTodo = useCallback(() => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== todo.id));
    setIsEditing(false);
  }, [setIsEditing, todos, setTodos, todo]);

  const handleTitleFieldKeyUp = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsEditing(false);
      setTodoTitle(todo.title);
    } else if (event.key === 'Enter' && todoTitle.trim()) {
      saveTitleChanges();
    } else if (event.key === 'Enter' && !todoTitle.trim()) {
      deleteEmptyTodo();
    }
  }, [setIsEditing, todoTitle, deleteEmptyTodo, saveTitleChanges, todo]);

  const handleTitleFieldBlur = useCallback(() => {
    if (todoTitle.trim()) {
      saveTitleChanges();
    } else {
      deleteEmptyTodo();
    }
  }, [todoTitle, deleteEmptyTodo, saveTitleChanges]);

  return (
    <li
      onDoubleClick={() => setIsEditing(true)}
      className={cn({
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleCheckBoxChange(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          aria-label="delete"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteClick(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={todoTitle}
        onChange={handleTitleChange}
        onKeyUp={handleTitleFieldKeyUp}
        onBlur={handleTitleFieldBlur}
      />
    </li>
  );
};
