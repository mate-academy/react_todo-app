/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import classNames from 'classnames';
import { TodosContext } from '../services/TodosContext';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoQuery, setEditingTodoQuery] = useState<string>('');
  const editingField = useRef<HTMLInputElement | null>(null);
  const isEditingOnKeyupCalled = useRef<boolean>(false);

  const { id, title, completed } = todo;

  useEffect(() => {
    if (editingField.current && editingTodoId) {
      editingField.current.focus();
    }
  }, [editingTodoId]);

  const deleteTodoById = useCallback(
    (todoId: number): void => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

      newTodos.splice(index, 1);
      setTodos(newTodos);
    },
    [todos, setTodos],
  );

  const changeTodoTitleById = useCallback(
    (todoId: number): void => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

      newTodos[index].title = editingTodoQuery;
      setTodos(newTodos);
    },
    [editingTodoQuery, todos, setTodos],
  );

  const startEditingTodo = useCallback((): void => {
    setEditingTodoId(id);
    setEditingTodoQuery(title);
  }, [id, title]);

  const cancelEditingTodo = useCallback((): void => {
    setEditingTodoQuery('');
    setEditingTodoId(null);
  }, []);

  const handleCheckboxChangeById = useCallback(
    (todoId: number): void => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

      newTodos[index].completed = !completed;
      setTodos(newTodos);
    },
    [completed, todos, setTodos],
  );

  const handleEditTodoOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setEditingTodoQuery(event.target.value);
    },
    [],
  );

  const handleEditTodoOnKeyup = useCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      todoId: number,
      todoTitle: string,
    ): void => {
      const isEnterPressed = event.key === 'Enter';
      const isEscapePressed = event.key === 'Escape';

      if (isEnterPressed) {
        if (!editingTodoQuery.trim()) {
          deleteTodoById(todoId);
        } else if (todoTitle !== editingTodoQuery) {
          changeTodoTitleById(todoId);
        }

        isEditingOnKeyupCalled.current = true;
        cancelEditingTodo();
      } else if (isEscapePressed) {
        isEditingOnKeyupCalled.current = true;
        cancelEditingTodo();
      }
    },
    [editingTodoQuery, deleteTodoById, changeTodoTitleById, cancelEditingTodo],
  );

  const handleEditTodoOnBlur = useCallback(
    (todoId: number, todoTitle: string): void => {
      if (isEditingOnKeyupCalled.current) {
        isEditingOnKeyupCalled.current = false;

        return;
      }

      if (!editingTodoQuery.trim()) {
        deleteTodoById(todoId);
      } else if (todoTitle !== editingTodoQuery) {
        changeTodoTitleById(todoId);
      }

      cancelEditingTodo();
    },
    [editingTodoQuery, deleteTodoById, changeTodoTitleById, cancelEditingTodo],
  );

  return (
    <li
      className={classNames({ completed }, { editing: id === editingTodoId })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          checked={completed}
          onChange={() => handleCheckboxChangeById(id)}
        />
        <label onDoubleClick={startEditingTodo}>{title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodoById(id)}
        />
      </div>
      <input
        ref={editingField}
        type="text"
        className="edit"
        value={editingTodoQuery}
        onChange={handleEditTodoOnChange}
        onBlur={() => handleEditTodoOnBlur(id, title)}
        onKeyUp={event => handleEditTodoOnKeyup(event, id, title)}
      />
    </li>
  );
};
