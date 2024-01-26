import cn from 'classnames';
import {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { TodoType } from '../types/todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: TodoType,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const { todos, setTodos } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateTodo = useCallback((updatedTodo: TodoType) => {
    const newTodoItems = [...todos];
    const index = newTodoItems
      .findIndex(todoForUpdate => todoForUpdate.id === updatedTodo.id);

    newTodoItems.splice(index, 1, updatedTodo);
    setTodos(newTodoItems);
  }, [todos, setTodos]);

  const setTodoCompleted = (completed: boolean) => {
    updateTodo({ ...todo, completed });
  };

  const handleCheckboxChange = () => {
    setTodoCompleted(!todo.completed);
  };

  const deleteTodo = useCallback((todoId: number) => {
    setTodos(todos
      .filter(todoForDelete => todoForDelete.id !== todoId));
  }, [todos, setTodos]);

  const handleDeleteButtonClick = () => {
    deleteTodo(todo.id);
  };

  const startEditing = () => {
    setSelectedTodo(todo);
  };

  const finishEditing = () => {
    setSelectedTodo(null);
    if (!editedTitle.trim()) {
      deleteTodo(todo.id);

      return;
    }

    updateTodo({ ...todo, title: editedTitle });
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      finishEditing();
    }
  };

  const handleEscapePress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedTitle(todo.title);
      setSelectedTodo(null);
    }
  };

  useEffect(() => {
    if (selectedTodo === todo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedTodo, todo]);

  return (
    <li
      className={cn({
        editing: selectedTodo === todo,
        completed: todo.completed,
        // view: !todo.completed && selectedTodo === todo,
      })}
      onDoubleClick={startEditing}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-editing-${todo.id}`}
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="Delete"
          onClick={handleDeleteButtonClick}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editedTitle}
        onChange={handleEditChange}
        onBlur={finishEditing}
        onKeyDown={handleEnterPress}
        onKeyUp={handleEscapePress}
        ref={inputRef}
      />
    </li>
  );
};
