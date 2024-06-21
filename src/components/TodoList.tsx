import { useContext, useState } from 'react';
import { LOCAL_STOR_KEY, SelectedContext, TodosContext } from '../store';
import cn from 'classnames';
import { Todo } from '../types/type';

export const TodoList: React.FC = () => {
  const { todos, dispatch } = useContext(TodosContext);
  const { selected } = useContext(SelectedContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const storedTodos = localStorage.getItem(LOCAL_STOR_KEY);
  const storedTodosArray: Todo[] = storedTodos ? JSON.parse(storedTodos) : [];

  const removeTodo = (todo: Todo) => {
    dispatch({ type: 'REMOVE_TODO', payload: todo });

    const newTodos = todos.filter(t => t.id !== todo.id);

    localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(newTodos));
  };

  const isDone = (todo: Todo) => {
    dispatch({ type: 'TOGGLE_TODO', payload: todo });
    dispatch({ type: selected.toUpperCase() });
    const updatedTodos = storedTodosArray.map(el => {
      if (el.id === todo.id) {
        return { ...el, completed: !el.completed };
      }

      return el;
    });

    localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(updatedTodos));
  };

  const handleDoubleClick = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setEditingTitle(todo.title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingTitle(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && editingTitle.trim()) {
      e.preventDefault();
      const updatedTodos = storedTodosArray.map(t =>
        t.id === editingTodoId ? { ...t, title: editingTitle } : t,
      );

      localStorage.setItem(LOCAL_STOR_KEY, JSON.stringify(updatedTodos));
      dispatch({ type: 'SET_TODOS', payload: updatedTodos });
      dispatch({ type: selected.toUpperCase() });
      setEditingTodoId(null);
      setEditingTitle('');
    }
  };

  const handleBlur = () => {
    setEditingTodoId(null);
    setEditingTitle('');
  };

  if (!storedTodosArray) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', { completed: todo.completed })}
        >
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              onClick={() => isDone(todo)}
            />
          </label>

          {editingTodoId === todo.id ? (
            <input
              type="text"
              value={editingTitle}
              onChange={handleTitleChange}
              onKeyPress={handleKeyPress}
              onBlur={handleBlur}
              className="todoapp__new-todo--edit"
              autoFocus
            />
          ) : (
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => handleDoubleClick(todo)}
            >
              {todo.title}
            </span>
          )}

          {todo.id !== editingTodoId && (
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => removeTodo(todo)}
            >
              ×
            </button>
          )}
        </div>
      ))}
    </section>
  );
};
