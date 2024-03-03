import React, { useCallback, useContext, useRef, useReducer } from 'react';
import cn from 'classnames';
import { Todo } from '../Types/Todo';
import { TodosContext } from '../Context/TodosContext';

interface Props {
  todo: Todo;
}

interface TodoItemState {
  isEditing: boolean;
  todoTitle: string;
}

type TodoItemAction =
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'SET_TODO_TITLE'; payload: string };

const todoItemReducer = (
  state: TodoItemState,
  action: TodoItemAction,
): TodoItemState => {
  switch (action.type) {
    case 'SET_EDITING':
      return { ...state, isEditing: action.payload };
    case 'SET_TODO_TITLE':
      return { ...state, todoTitle: action.payload };
    default:
      return state;
  }
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [{ isEditing, todoTitle }, dispatch] = useReducer(todoItemReducer, {
    isEditing: false,
    todoTitle: todo.title,
  });
  const titleField = useRef<HTMLInputElement | null>(null);

  const saveTitleChanges = useCallback(() => {
    setTodos(
      todos.map(prevTodo => {
        if (prevTodo.id === todo.id) {
          return { ...prevTodo, title: todoTitle };
        }

        return prevTodo;
      }),
    );
    dispatch({ type: 'SET_EDITING', payload: false });
  }, [setTodos, todos, todo, todoTitle, dispatch]);

  const deleteEmptyTodo = useCallback(() => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== todo.id));
    dispatch({ type: 'SET_EDITING', payload: false });
  }, [setTodos, todos, todo, dispatch]);

  const handleDoubleClick = useCallback(() => {
    dispatch({ type: 'SET_EDITING', payload: true });
  }, [dispatch]);

  const handleDeleteClick = useCallback(() => {
    setTodos(todos.filter(prevTodo => prevTodo.id !== todo.id));
  }, [setTodos, todos, todo]);

  const handleCheckBoxChange = useCallback(() => {
    const newTodos = todos.map(prevTodo => {
      if (prevTodo.id === todo.id) {
        return { ...prevTodo, completed: !prevTodo.completed };
      }

      return prevTodo;
    });

    setTodos(newTodos);
  }, [setTodos, todos, todo]);

  const handleTitleFieldKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch({ type: 'SET_EDITING', payload: false });
        dispatch({ type: 'SET_TODO_TITLE', payload: todo.title });
      } else if (event.key === 'Enter' && todoTitle.trim()) {
        saveTitleChanges();
      } else if (event.key === 'Enter' && !todoTitle.trim()) {
        deleteEmptyTodo();
      }
    },
    [todoTitle, deleteEmptyTodo, saveTitleChanges, dispatch, todo],
  );

  const handleTitleFieldBlur = useCallback(() => {
    if (todoTitle.trim()) {
      saveTitleChanges();
    } else {
      deleteEmptyTodo();
    }
  }, [todoTitle, deleteEmptyTodo, saveTitleChanges]);

  return (
    <li
      onDoubleClick={handleDoubleClick}
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
          onChange={handleCheckBoxChange}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          aria-label="delete"
          className="destroy"
          data-cy="deleteTodo"
          onClick={handleDeleteClick}
        />
      </div>
      <input
        type="text"
        className="edit"
        ref={titleField}
        value={todoTitle}
        onChange={e =>
          dispatch({ type: 'SET_TODO_TITLE', payload: e.target.value })
        }
        onKeyUp={handleTitleFieldKeyUp}
        onBlur={handleTitleFieldBlur}
      />
    </li>
  );
};
