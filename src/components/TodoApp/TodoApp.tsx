import React, { useContext, useMemo, useState } from 'react';
import { DispatchTodosContext, TodosContext } from '../../context/TodosContext';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { StatusEnum } from '../../interfaces/StatusEnum';

export const TodoApp: React.FC = () => {
  const dispatch = useContext(DispatchTodosContext);
  const todos = useContext(TodosContext);

  const [todoTitle, setTodoTitle] = useState('');

  const [filter, setFilter] = useState<StatusEnum>(
    window.location.hash.slice(2) as StatusEnum || StatusEnum.All,
  );

  const handleChangeFilter = (newFilter: StatusEnum) => {
    setFilter(newFilter);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      dispatch({
        type: 'add',
        todo: { id: +new Date(), completed: false, title: todoTitle },
      });
    }

    setTodoTitle('');
  };

  const handleSetTodoTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const isCompletedAll = useMemo(() => {
    return todos.every(todo => todo.completed);
  }, [todos]);

  const handleChangeCompletedStatus = () => {
    dispatch({ type: 'change completed status for all', isCompletedAll });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'delete completed' });
  };

  const notCompletedTodosLength = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const hasCompletedTodo = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={todoTitle}
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={handleSetTodoTitle}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={isCompletedAll}
              onChange={handleChangeCompletedStatus}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList filter={filter} />

          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${notCompletedTodosLength} items left`}
            </span>

            <TodosFilter filter={filter} onChangeFilter={handleChangeFilter} />

            { hasCompletedTodo && (
              <button
                type="button"
                className="clear-completed"
                onClick={handleClearCompleted}
              >
                Clear completed
              </button>
            )}

          </footer>
        </>
      )}
    </div>
  );
};
