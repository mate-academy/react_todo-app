import React, { useEffect } from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { init } from './features/todosSlice';
import { filterTodos } from './helpers/filterBy';

export const App: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const filteredTodos = filterTodos(todos, status);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />
        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
        {todos.length > 0 && <TodoFilter />}
      </div>
    </div>
  );
};
