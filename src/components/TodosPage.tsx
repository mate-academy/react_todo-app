/* eslint-disable no-console */
import { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AddTodoForm } from './AddTodoForm';

import { Footer } from './Footer';
import { TodoItem } from './TodoItem';
import { TodosContext } from './TodosContext';

import { Filter } from '../types/Filter';

export function TodosPage() {
  const todoActions = useContext(TodosContext);
  const { type = Filter.all } = useParams<{ type: Filter }>();
  const navigate = useNavigate();

  const todos = todoActions.getAll();
  const visibleTodos = todoActions.getAll(type);
  const activeTodos = todoActions.getAll(Filter.active);
  const hasActiveTodos = activeTodos.length > 0;

  const toggleAll = () => {
    todoActions.toggleAll(hasActiveTodos);
  };

  const clearCompleted = () => {
    todoActions.clearCompleted();
    navigate(`/${Filter.all}`);
  };

  return ( // --------- Template ------------
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodoForm addTodo={todoActions.add} />
      </header>

      {todos.length > 0 && (
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={!hasActiveTodos}
            onChange={toggleAll}
          />

          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {visibleTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={todoActions.remove}
                onUpdate={todoActions.update}
              />
            ))}
          </ul>
        </section>
      )}

      {todos.length > 0 && (
        <Footer
          itemsLeft={activeTodos.length}
          clearCompleted={clearCompleted}
        />
      )}
    </section>
  );
}
