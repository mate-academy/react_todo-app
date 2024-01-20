/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';
import { TodoForm } from './components/TodoForm';
import { Status, Todo } from './types/todo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<Status>(Status.all);

  const addTodo = useCallback(({ id, ...data }: Todo) => {
    const newTodo = {
      id: +new Date(),
      ...data,
    };

    setTodoItems(currentTodos => {
      if (!newTodo.title.trim()) {
        return [...currentTodos];
      }

      return [newTodo, ...currentTodos];
    });
  }, []);

  const updateTodo = useCallback((updatedTodo: Todo) => {
    setTodoItems((currentTodos) => {
      const newTodoItems = [...currentTodos];
      const index = newTodoItems.findIndex(todo => todo.id === updatedTodo.id);

      newTodoItems.splice(index, 1, updatedTodo);

      return newTodoItems;
    });
  }, []);

  // const updateCompleted = useCallback(() => {

  // }, []);

  const deleteTodo = useCallback((todoId: number) => {
    setTodoItems(currentTodos => currentTodos
      .filter(todo => todo.id !== todoId));
  }, []);

  const visibleTodos = [...todoItems].filter(todo => {
    switch (filterStatus) {
      case Status.active:
        return !todo.completed;
      case Status.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  // eslint-disable-next-line no-console
  console.log('Visible Todos:', visibleTodos);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <TodoForm onSubmit={addTodo} />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={visibleTodos}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />

      </section>

      <footer className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${visibleTodos.filter(todo => !todo.completed).length} items left`}
        </span>

        <TodosFilter setFilterStatus={setFilterStatus} />

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </div>
  );
};
