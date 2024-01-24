import cn from 'classnames';
import {
  useCallback,
  useContext, useEffect, useRef, useState,
} from 'react';
import { Todo } from '../types/todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);

  const { setTodoItems } = useContext(TodosContext);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodoItems((currentTodos) => {
      const newTodoItems = [...currentTodos];
      const index = newTodoItems
        .findIndex(todoForUpdate => todoForUpdate.id === updatedTodo.id);

      newTodoItems.splice(index, 1, updatedTodo);

      return newTodoItems;
    });
  }, [setTodoItems]);

  const deleteTodo = useCallback((todoId: number) => {
    setTodoItems(currentTodos => currentTodos
      .filter(todoForDelete => todoForDelete.id !== todoId));
  }, [setTodoItems]);

  const setTodoCompleted = (completed: boolean) => {
    updateTodo({ ...todo, completed });
  };

  const handleCheckboxChange = () => {
    setTodoCompleted(!todo.completed);
  };

  const handleDeleteButtonClick = () => {
    deleteTodo(todo.id);
  };

  const startEditing = () => {
    setSelectedTodo(todo);
  };

  const finishEditing = () => {
    setSelectedTodo(null);
    updateTodo({ ...todo, title: editedTitle });
  };

  const handleEditChange = (newTitle: string) => {
    setEditedTitle(newTitle);
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
        view: !todo.completed && selectedTodo === todo,
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
        onChange={(e) => handleEditChange(e.target.value)}
        onBlur={finishEditing}
        onKeyDown={handleEnterPress}
        onKeyUp={handleEscapePress}
        ref={inputRef}
      />
    </li>
  );
};
