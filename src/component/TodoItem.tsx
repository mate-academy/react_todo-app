import { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodoContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTitle, setNewTitle] = useState('');
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const completeTodo = () => {
    const updatedTodos = todos.map(todoItem => {
      if (todoItem.id === todo.id) {
        return {
          ...todoItem,
          completed: !todoItem.completed,
        };
      }

      return todoItem;
    });

    setTodos(updatedTodos);
  };

  const editTodo = () => {
    setEditing(true);
    setNewTitle(todo.title);
  };

  const deleteTodo = () => {
    setTodos(currentTodos =>
      currentTodos.filter(todoItem => todoItem.id !== todo.id),
    );
  };

  const editTittle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const editTodoOnBlur = () => {
    if (!editing) {
      return;
    }

    if (newTitle.trim() !== '') {
      const updatedTodos = todos.map(todoItem => {
        if (todoItem.id === todo.id) {
          return {
            ...todoItem,
            title: newTitle.trim(),
          };
        }

        return todoItem;
      });

      setTodos(updatedTodos);
    } else {
      setTodos(currentTodos =>
        currentTodos.filter(elem => elem.id !== todo.id),
      );
    }

    setEditing(false);
  };

  const editEndKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && editing) {
      editTodoOnBlur();
    } else if (event.key === 'Escape') {
      setEditing(false);
    }
  };

  return (
    <li
      className={
        (todo.completed ? 'completed ' : '') + (editing ? 'editing' : '')
      }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-viw${todo.id}`}
          checked={todo.completed}
          onChange={completeTodo}
        />
        <label onDoubleClick={editTodo}>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        className="edit"
        value={newTitle}
        onChange={editTittle}
        onKeyUp={editEndKeyUp}
        onBlur={editTodoOnBlur}
      />
    </li>
  );
};
