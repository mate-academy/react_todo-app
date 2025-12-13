import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { filterTodo } from '../Services/Todo';
import classNames from 'classnames';
import { FilterTodo } from '../types/FilterTodo';
import { useTodoData } from '../hooks/useTodoData';
import { useTodoUI } from '../hooks/useTodoUI';

export type Props = {};

export type TodoFormRef = {
  focus: () => void;
};

const TodoFormComponent = forwardRef<TodoFormRef, Props>((_props, ref) => {
  const [query, setQuery] = useState('');
  const { todos, addTodo, updateTodo } = useTodoData();
  const { addErrorMessage } = useTodoUI();

  const localInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      localInputRef.current?.focus();
    },
  }));

  const completedTodos = React.useMemo(
    () => filterTodo(todos, FilterTodo.completed),
    [todos],
  );

  const resetForm = () => {
    setQuery('');
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const normailedQuery = query.trim();

    if (!normailedQuery) {
      addErrorMessage('Title should not be empty', false);

      return;
    }

    addTodo(normailedQuery);
    resetForm();
  };

  const completeAll = async () => {
    const action = completedTodos.length !== todos.length;
    const todosToUpdate = todos.filter(todo => todo.completed !== action);

    if (todosToUpdate.length === 0) {
      return;
    }

    todosToUpdate.map(todo => updateTodo(todo.id, { completed: action }));
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          onClick={completeAll}
          className={classNames('todoapp__toggle-all', {
            active: todos.length === completedTodos.length,
          })}
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          onChange={event => handleChangeInput(event)}
          ref={localInputRef}
          value={query}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
});

TodoFormComponent.displayName = 'TodoFormComponent';

export const TodoForm = React.memo(TodoFormComponent);
