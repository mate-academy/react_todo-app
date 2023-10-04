import React, { useContext, useMemo, useState } from 'react';
import { TodosContext } from '../TodosContext/TodosContext';
import { Todolist } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [allChecked, setAllChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const notCompletedTodos = todos.filter(todo => todo.completed === false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();

    if (trimmedValue) {
      const newTodo = {
        id: +new Date(),
        title: trimmedValue,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      setInputValue('');
    }
  };

  const checkingAllHandler = () => {
    setTodos(todos.map(currentTodo => (
      {
        ...currentTodo,
        completed: !allChecked,
      })));

    setAllChecked(!allChecked);
  };

  const deleteCompletedHandler = () => {
    setTodos(todos.filter(currentTodo => !currentTodo.completed));
  };

  const completedTodosCounter = useMemo(() => (
    todos.filter(currentTodo => currentTodo.completed).length
  ), [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={onSubmit}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={onInputChangeHandler}
          />
        </form>
      </header>

      {!!todos.length && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allChecked}
            onChange={checkingAllHandler}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <Todolist />
        </section>
      )}

      {!!todos.length && (
        <footer className="footer" data-cy="todosFilter">
          <span className="todo-count" data-cy="todosCounter">
            {`${notCompletedTodos.length} items left`}
          </span>

          <TodosFilter />

          {!!completedTodosCounter && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompletedHandler}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
