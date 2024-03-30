/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { Todo } from '../../type/type';
import { TodosContext } from '../../utils/TodosContext';

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [isEditing, setIsEditing] = useState(false);
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const titleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditing && titleField.current) {
      titleField.current.focus();
    }
  }, [isEditing]);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTodoTitle(event.target.value);
    },
    [setTodoTitle],
  );

  const saveTitleChanges = useCallback(() => {
    setTodos(
      todos.map(prevTodo => {
        if (prevTodo.id === todo.id) {
          return {
            ...prevTodo,
            title: todoTitle,
          };
        }

        return prevTodo;
      }),
    );
    setIsEditing(false);
  }, [setTodos, todos, todoTitle, todo]);

  const deleteEmptyTodo = useCallback(() => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== todo.id));
    setIsEditing(false);
  }, [setIsEditing, todos, setTodos, todo]);

  const handleTitleFieldKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditing(false);
        setTodoTitle(todo.title);
      } else if (event.key === 'Enter' && todoTitle.trim()) {
        saveTitleChanges();
      } else if (event.key === 'Enter' && !todoTitle.trim()) {
        deleteEmptyTodo();
      }
    },
    [setIsEditing, todoTitle, deleteEmptyTodo, saveTitleChanges, todo],
  );

  const handleChangeCheckbox = useCallback(
    (todoId: number) => {
      const newTodos = todos.map(todoForChange => {
        if (todoForChange.id === todoId) {
          return {
            ...todoForChange,
            completed: !todo.completed,
          };
        }

        return todoForChange;
      });

      setTodos(newTodos);
    },
    [setTodos, todo.completed, todos],
  );

  const handleDeleteTodo = useCallback(
    (todoId: number) => {
      const newTodos = todos.filter(
        todoForChange => todoForChange.id !== todoId,
      );

      setTodos(newTodos);
    },
    [setTodos, todos],
  );

  return (
    <li
      onDoubleClick={() => setIsEditing(true)}
      className={classNames({
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
          onChange={() => handleChangeCheckbox(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDeleteTodo(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={todoTitle}
        onChange={handleTitleChange}
        onKeyUp={handleTitleFieldKeyUp}
        ref={titleField}
      />
    </li>
  );
};

export default TodoItem;
