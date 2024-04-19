import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TodosContext } from '../services/TodosContext';
import { Todo } from '../types/Todo';
import className from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { id, title, completed } = todo;
  const editingField = useRef<HTMLInputElement | null>(null);
  const [editingTodoQuery, setEditingTodoQuery] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const isEditingOnKeyupCalled = useRef<boolean>(false);

  useEffect(() => {
    if (editingField.current && editingTodoId) {
      editingField.current.focus();
    }
  }, [editingTodoId]);

  const changeTodoTitleById = useCallback(
    (todoId: number): void => {
      const newTodos = [...todos];
      const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

      newTodos[index].title = editingTodoQuery;

      setTodos(newTodos);
    },
    [editingTodoQuery, todos, setTodos],
  );

  const deleteTodoById = useCallback(
    (todoId: number): void => {
      const newTodos = [...todos];

      const index = newTodos.findIndex(todoItem => todoItem.id === todoId);

      newTodos.splice(index, 1);

      setTodos(newTodos);
    },
    [todos, setTodos],
  );

  const handleCheckboxChangeById = useCallback(
    (todoId: number): void => {
      const changedTodos = [...todos];

      const index = changedTodos.findIndex(todoItem => todoItem.id === todoId);

      changedTodos[index].completed = !completed;

      setTodos(changedTodos);
    },
    [todos, setTodos, completed],
  );

  const startEditingTodo = () => {
    setEditingTodoQuery(title);
    setEditingTodoId(id);
  };

  const cancelEditingTodo = () => {
    setEditingTodoQuery('');
    setEditingTodoId(null);
  };

  const handleEditTodoOnKeyup = useCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      todoId: number,
      todoTitle: string,
    ) => {
      const isEnterPressed = event.key === 'Enter';
      const isEscapePressed = event.key === 'Escape';

      if (isEnterPressed) {
        if (!editingTodoQuery.trim()) {
          deleteTodoById(todoId);
        } else if (editingTodoQuery !== todoTitle) {
          changeTodoTitleById(todoId);
        }

        isEditingOnKeyupCalled.current = true;
        cancelEditingTodo();
      } else if (isEscapePressed) {
        isEditingOnKeyupCalled.current = false;
        cancelEditingTodo();
      }
    },
    [editingTodoQuery, changeTodoTitleById, deleteTodoById],
  );

  const handleEditTodoOnBlur = useCallback(
    (todoId: number, todoTitle: string) => {
      if (isEditingOnKeyupCalled.current) {
        isEditingOnKeyupCalled.current = false;

        return;
      }

      if (!editingTodoQuery.trim()) {
        deleteTodoById(todoId);
      }

      if (editingTodoQuery !== todoTitle) {
        changeTodoTitleById(todoId);
      }

      cancelEditingTodo();
    },
    [changeTodoTitleById, deleteTodoById, editingTodoQuery],
  );

  return (
    <li className={className('todo', { completed: completed })}>
      <div className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status toggle"
            checked={completed}
            onChange={() => handleCheckboxChangeById(id)}
          />
        </label>
        <div
          data-cy="todo__title"
          className="todo__title"
          style={{ width: 'max-content' }}
          onDoubleClick={startEditingTodo}
        >
          {title}
        </div>
      </div>

      {!editingTodoId && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => deleteTodoById(id)}
        >
          ×
        </button>
      )}

      {editingTodoId && (
        <input
          ref={editingField}
          value={editingTodoQuery}
          onChange={e => setEditingTodoQuery(e.target.value)}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          onBlur={() => handleEditTodoOnBlur(id, title)}
          onKeyUp={event => handleEditTodoOnKeyup(event, id, title)}
        />
      )}
    </li>
  );
};
