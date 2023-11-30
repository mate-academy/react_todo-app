/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { Status } from '../../data/enums';
import { TodosContext } from '../TodosContext';
import { TodoHeader } from '../TodoHeader/TodoHeader';
import { Footer } from '../Footer/Footer';

export const TodoApp: React.FC = () => {
  const [filter, setFilter] = useState(Status.ALL);
  const [completeAllTodos, setCompleteAllTodos] = useState(false);
  const { todos, setTodos } = useContext(TodosContext);

  const filterTodos = (currentTodos: Todo[], filterType: Status) => {
    let filteredTodos = [...currentTodos];

    if (filterType !== Status.ALL) {
      if (filterType !== Status.ACTIVE) {
        filteredTodos = filteredTodos.filter(item => item.completed);
      } else {
        filteredTodos = filteredTodos.filter(item => !item.completed);
      }
    }

    return filteredTodos;
  };

  const toggleAll = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !completeAllTodos,
    })));
  };

  const filteredTodos = filterTodos(todos, filter);

  return (
    <>
      <TodoHeader />

      {todos.length !== 0
        && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                data-cy="toggleAll"
                onClick={() => setCompleteAllTodos(!completeAllTodos)}
                onChange={toggleAll}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList todos={filteredTodos} />
            </section>

            <Footer
              currentAppliedFilter={filter}
              onFilterChange={setFilter}
            />
          </>
        )}
    </>
  );
};
