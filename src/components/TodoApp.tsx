import { useState } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { ToglerAllTodos } from './ToglerAllTodos';
import { Todo } from '../types/Todo';

export const TodoApp = () => {
  const [todos] = useState<Todo[]>([]);

  return (
    <div className="todoapp">
      <Header />
      <section className="main">
        {!!todos.length
         && (
           <ToglerAllTodos />
         )}

        <TodoList todos={todos} />
      </section>

      {!!todos.length
        && (
          <Footer todosLength={todos.length} />
        )}
    </div>
  );
};
