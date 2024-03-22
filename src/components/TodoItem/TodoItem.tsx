import { useTodos } from '../../utils/TodoContext';
import { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/types';

interface Props {
  key: number;
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos, removeTodo } = useTodos();
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const toggleCompletedTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(prev =>
        prev.id === id ? { ...prev, completed: !prev.completed } : prev,
      ),
    );
  };

  const toggleEditTodo = (id: number) => {
    setEditingTodoId(id);
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const newText = e.target.value;

    setTodos(prevTodos =>
      prevTodos.map(prev =>
        prev.id === id ? { ...prev, title: newText } : prev,
      ),
    );
  };

  const handleEditInputKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.key === 'Enter') {
      const newText = e.currentTarget.value.trim();

      setTodos(prevTodos =>
        prevTodos.map(prev =>
          prev.id === id ? { ...prev, title: newText } : prev,
        ),
      );

      if (newText === '') {
        removeTodo(id);
      } else {
        setEditingTodoId(null);
      }
    } else if (e.key === 'Escape') {
      setEditingTodoId(null);
    }
  };

  return (
    <li
      className={cn({
        completed: todo.completed,
        editing: editingTodoId === todo.id,
      })}
      onDoubleClick={() => toggleEditTodo(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleCompletedTodo(todo.id)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => removeTodo(todo.id)}
        ></button>
      </div>
      <input
        type="text"
        className="edit"
        value={todo.title}
        onChange={e => handleEditInputChange(e, todo.id)}
        onKeyUp={e => handleEditInputKeyUp(e, todo.id)}
        onBlur={() => setEditingTodoId(null)}
      />
    </li>
  );
};
