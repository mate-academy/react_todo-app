import cn from 'classnames';
import {
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react';
import { TodosContext } from '../store/TodosContext';
import { Todo } from '../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [newTodoTitle, setNewTodoTitle] = useState(todo.title);
  const [editMode, setEditMode] = useState(false);

  const deleteTodoButtonHandler = (id: number) => {
    setTodos(todos.filter(oneTodo => oneTodo.id !== id));
  };

  const completedToggleHandler = (id: number) => {
    const updatedList = todos.map((editedTodo) => {
      const completedTodo = editedTodo;

      if (completedTodo.id === id) {
        completedTodo.completed = !completedTodo.completed;
      }

      return completedTodo;
    });

    setTodos(updatedList);
  };

  const inputElement = useRef<HTMLInputElement>(null);

  const liClass = cn({
    completed: todo.completed,
    editing: editMode,
  });

  const saveNewTodoTitle = () => {
    setTodos(todos.map(el => {
      const newTodo = el;

      if (newTodo.id === todo.id) {
        newTodo.title = newTodoTitle;
      }

      return newTodo;
    }));
  };

  useEffect(() => {
    if (inputElement.current && editMode) {
      inputElement.current.focus();
    }
  }, [editMode]);

  const newFunc = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keys = ['Enter', 'Escape'];

    if (!keys.includes(e.key)) {
      return;
    }

    if (e.key === 'Enter' && newTodoTitle === '') {
      setTodos(todos.filter(oneTodo => oneTodo.id !== todo.id));
    } else if (e.key === 'Enter') {
      saveNewTodoTitle();
    } else if (e.key === 'Escape') {
      setNewTodoTitle(todo.title);
    }

    setEditMode(false);
  };

  const onBlurHandler = () => {
    setEditMode(false);
    saveNewTodoTitle();
  };

  const changeNewTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  return (
    <li className={liClass}>
      <div className="view" onDoubleClick={() => setEditMode(true)}>
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => completedToggleHandler(todo.id)}
        />
        <label>
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodoButtonHandler(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        onBlur={onBlurHandler}
        value={newTodoTitle}
        ref={inputElement}
        onChange={e => changeNewTodoTitle(e)}
        onKeyUp={e => newFunc(e)}
      />
    </li>
  );
};
