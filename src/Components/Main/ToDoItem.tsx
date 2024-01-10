import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../Types/Todo';
import { ToDoContext } from '../Context/ToDoContext';

type Props = {
  todo: Todo
};

export const ToDoItem: React.FC<Props> = ({ todo }) => {
  const [editedToDo, setEditedToDo] = useState<Todo | null>(null);
  const { todos, setTodos } = useContext(ToDoContext);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [editedToDo]);

  const changeComplete = (todoId: number) => {
    setTodos(todos.map(item => {
      if (item.id === todoId) {
        return { ...item, completed: !item.completed };
      }

      return item;
    }));
  };

  const handleDelete = (todoId:number) => {
    setTodos(todos.filter(item => item.id !== todoId));
  };

  const handleAdding = () => {
    if (editedToDo?.title.trim().length === 0) {
      setTodos(todos.filter(item => item.id !== editedToDo.id));
    } else {
      setTodos(todos.map(item => {
        if (item.id === editedToDo?.id) {
          return { ...item, title: editedToDo.title };
        }

        return item;
      }));
    }

    setEditedToDo(null);
  };

  const handleDoubleClick = (item:Todo) => {
    setEditedToDo(item);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedToDo) {
      setEditedToDo({
        ...editedToDo,
        title: event.target.value,
      });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditedToDo(null);
    }
  };

  return (
    <li className={
      cn({ completed: todo.completed, editing: editedToDo?.id === todo.id })
    }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={todo.completed}
          onClick={() => changeComplete(todo.id)}
          id={todo.completed === true ? 'toggle-completed' : 'toggle-view'}
        />
        <label
          htmlFor={todo.completed === true ? 'toggle-completed' : 'toggle-view'}
          onDoubleClick={() => handleDoubleClick(todo)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          aria-label="Save"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDelete(todo.id)}
        />
      </div>
      <input
        type="text"
        ref={titleField}
        className="edit"
        value={editedToDo?.title}
        onChange={handleChangeTitle}
        onBlur={handleAdding}
        onKeyUp={handleKeyUp}
      />
    </li>
  );
};
