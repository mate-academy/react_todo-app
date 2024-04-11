import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import { todoPattern } from '../TodoContext/TodoContext';
import classNames from 'classnames';

export const Header = () => {
  const { todosList, setTodosList, newTodo, setNewTodo } =
    useContext(TodoContext);

  const headerInput = useRef<HTMLInputElement>(null);

  const isAllComplete =
    todosList.length ===
    todosList.filter(todo => todo.completed === true).length;

  useEffect(() => {
    if (headerInput.current) {
      headerInput.current.focus();
    }
  }, [todosList]);

  const editNewTodo = (event: React.FocusEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.currentTarget.value,
    });
  };

  const resetNewTodo = () => {
    setNewTodo({
      ...todoPattern,
      id: +new Date(),
    });
  };

  const handleSubmitOfNewTodo = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      if (newTodo.title.trim() !== '') {
        setTodosList([
          ...todosList,
          { ...newTodo, title: newTodo.title.trim() },
        ]);
        resetNewTodo();
      }
    }
  };

  const allCompleteCheck = () => {
    if (todosList.length === 0) {
      return false;
    }

    return isAllComplete;
  };

  function toggleAll(condition: boolean) {
    todosList.map(todo => {
      const targetTodo = todosList.find(item => item.id === todo.id);

      if (targetTodo) {
        targetTodo.completed = condition;
      }
    });
  }

  const handletoggleAll = () => {
    if (!allCompleteCheck()) {
      toggleAll(true);

      setTodosList([...todosList]);
    } else {
      toggleAll(false);

      setTodosList([...todosList]);
    }
  };

  return (
    <header className="todoapp__header">
      {todosList.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allCompleteCheck(),
          })}
          data-cy="ToggleAllButton"
          onClick={handletoggleAll}
        />
      )}

      <form>
        <input
          ref={headerInput}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo.title}
          onChange={editNewTodo}
          onKeyDown={handleSubmitOfNewTodo}
        />
      </form>
    </header>
  );
};
