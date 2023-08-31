import React, { useContext } from 'react';
import { TodoCard } from './TodoCard';
import { Todo } from './types/Todo';
import { TodosContext } from './TodoContext';
import { updateTodos } from './api/todos';
import { ErrorStatus } from './types/Error';

type Props = {
  todos: Todo[],
  visibleTodos: Todo[],
  toggleAll: Todo[],
  untoggleAll: Todo[],
};

export const TodoList: React.FC<Props> = ({
  todos,
  visibleTodos,
  toggleAll,
  untoggleAll,
}) => {
  const {
    setTodos,
    setError,
  } = useContext(TodosContext);

  const updateAll = async () => {
    setError(ErrorStatus.none);

    try {
      if (todos.findIndex(todo => todo.completed === false) > -1) {
        await Promise.all(todos.map(todo => updateTodos(todo.id, true)));

        setTodos(toggleAll);
      } else {
        await Promise.all(todos.map(todo => updateTodos(todo.id, false)));

        setTodos(untoggleAll);
      }
    } catch {
      setError(ErrorStatus.update);
    }
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={updateAll}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul
        className="todo-list"
        data-cy="todoList"
      >
        {visibleTodos.map(todo => (
          <TodoCard
            todos={todos}
            currentTodo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  );
};
