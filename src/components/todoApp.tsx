import React, { ChangeEvent, useContext, useState } from 'react';
import { TodoList } from './todoList';
import { TodosContext } from './todosContext';
import { TodosFilter } from './todosFilter';
import { ManageCheckboxContext } from './manageCheckboxContext';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const { isChecked, setIsChecked } = useContext(ManageCheckboxContext);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const newTodo = {
    id: +new Date(),
    title: inputValue.trim(),
    completed: false,
  };

  const onSubmit = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    } else {
      return;
    }
  };

  const handleHowManyLeft = () => {
    const howManyLeft = todos.filter(todo => !todo.completed);

    return `${howManyLeft.length} items left`;
  };

  const changeAllComplete = () => {
    return todos.map(elem => {
      return {
        ...elem,
        completed: !isChecked,
      };
    });
  };

  const handleCheckboxAll = () => {
    if (todos.length === 0) {
      return;
    }

    setIsChecked(!isChecked);
    setTodos(changeAllComplete());
  };

  const handleClearCompleted = () => {
    const todosCopy = [...todos];

    for (let i = todosCopy.length - 1; i >= 0; i--) {
      if (todosCopy[i].completed === true) {
        todosCopy.splice(i, 1);
      }
    }

    setTodos(todosCopy);
  };

  const isClearHiden = () => {
    return todos.some(elem => elem.completed === true);
  };

  if (todos.length === 0) {
    setIsChecked(false);
  }

  const isFiltersShown = () => {
    return todos.length > 0;
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form>
          <input
            autoFocus
            type="text"
            value={inputValue}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={handleEnter}
            onBlur={onSubmit}
            onChange={handleInputChange}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isChecked}
          onChange={handleCheckboxAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList items={todos} />
      </section>

      <footer className={`footer ${todos.length === 0 && 'hidden'}`}>
        <span className="todo-count" data-cy="todosCounter">
          {handleHowManyLeft()}
        </span>

        {isFiltersShown() === true && (
          <ul className="filters" data-cy="todosFilter">
            <TodosFilter />
          </ul>
        )}

        {isClearHiden() && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    </div>
  );
};
