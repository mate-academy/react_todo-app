import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../TodoContext/TodoContext';
import { todoPattern } from '../TodoContext/TodoContext';
import { useState } from 'react';
import classNames from 'classnames';

export const Header = () => {
  const { todosList, setTodosList, newTodo, setNewTodo } =
    useContext(TodoContext);
  const [idCount, setIdCount] = useState(2);
  const headerInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerInput.current) {
      headerInput.current.focus();
    }
  }, [todosList]);

  const getId = () => {
    setIdCount(idCount + 1);

    return idCount;
  };

  const editingNewTodo = (event: React.FocusEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.currentTarget.value,
    });
  };

  const resetNewTodo = () => {
    setNewTodo({
      ...todoPattern,
      id: getId(),
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
      return;
    }

    return (
      todosList.length ===
      todosList.filter(todo => todo.completed === true).length
    );
  };

  const checkAll = () => {
    todosList.map(todo => {
      const targetTodo = todosList.find(item => item.id === todo.id);

      if (targetTodo) {
        targetTodo.completed = true;
      }
    });
  };

  const unCheckAll = () => {
    todosList.map(todo => {
      const targetTodo = todosList.find(item => item.id === todo.id);

      if (targetTodo) {
        targetTodo.completed = false;
      }
    });
  };

  const handleAllChecked = () => {
    if (!allCompleteCheck()) {
      checkAll();

      setTodosList([...todosList]);
    } else {
      unCheckAll();

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
          onClick={handleAllChecked}
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
          onChange={editingNewTodo}
          onKeyDown={handleSubmitOfNewTodo}
        />
      </form>
    </header>
  );
};
