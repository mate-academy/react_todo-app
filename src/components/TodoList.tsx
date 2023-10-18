import React, { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const {
    todos,
    setTodos,
    isToggleAllStatus,
    setIsToggleAllStatus,
    filterTodos,
  } = useContext(TodosContext);

  const handleTogleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !isToggleAllStatus,
    })));

    setIsToggleAllStatus(!isToggleAllStatus);
  };

  const todosFilter = filterTodos();

  return (
    <>
      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleTogleAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todosList">
            {todosFilter.map(todo => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
};
