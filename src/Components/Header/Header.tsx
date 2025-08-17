/* eslint-disable prettier/prettier */
import { useContext, useEffect, useRef } from 'react';
import { TodoTitleContext } from '../../Context/TodoTitleContext';
import { TodoListContext } from '../../Context/TodoListContext';
import classNames from 'classnames';
import { EditContext } from '../../Context/EditContext';

export const Header = () => {
  const {
    todoTitle,
    setTodoTitle,
    handleTodoTitle,
    addTodo,
  } = useContext(TodoTitleContext);

  const { todoList } = useContext(TodoListContext);
  const { setEditedTodoList } = useContext(EditContext);
  const inputFocus = useRef<HTMLInputElement>(null);
  const allDone = todoList.every(todo => todo.completed);

  useEffect(() => {
    if (inputFocus.current) {
      inputFocus.current.focus();
    }
  }, [todoList]);

  const handleSwitchStatus = () => {
    setEditedTodoList({
      todosForChange: todoList,
      editType: 'completed'
    });
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify(todoList));
    }

    addTodo();
    setTodoTitle('');
  };

  return (
    <header className="todoapp__header">
      {todoList.length > 0 && (
        <button
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: allDone,
          })}
          data-cy="ToggleAllButton"
          onClick={handleSwitchStatus}
        />
      )}

      <form onSubmit={handleAddTodo} style={{ display: 'flex' }}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleTodoTitle}
          ref={inputFocus}
        />
      </form>
    </header>
  );
};
