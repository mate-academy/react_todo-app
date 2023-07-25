/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { Footer } from './TodosFilter';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { ToglerAllTodos } from './ToglerAllTodos';
import { Todo } from '../types/Todo';
import { addTodo, deleteTodo, getTodos } from '../services/todos';

const USER_ID = 6650;

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');

  // getting todo list from server

  const getTodosFromServer = async () => {
    try {
      const data = await getTodos(USER_ID);

      setTodos(data);
    } catch {
      console.warn('list loading error!');
    }
  };

  useEffect(() => {
    getTodosFromServer();
  }, []);

  // delete todo from server

  const removeTodoFromServer = async (id: number) => {
    try {
      await deleteTodo(id);
      await getTodosFromServer();
    } catch {
      console.warn('error of delete todo from server!');
    }
  };

  // add todo to server

  const addTodoToServer = async () => {
    try {
      await addTodo(USER_ID, query);
      await getTodosFromServer();
    } catch {
      console.warn('error of addition todo to server');
    } finally {
      setQuery('');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      console.warn('title can\'t be empty');

      return;
    }

    // eslint-disable-next-line consistent-return
    return addTodoToServer();
  };

  return (
    <div className="todoapp">
      <Header
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
      />
      <section className="main">
        {!!todos.length
         && (
           <ToglerAllTodos />
         )}

        <TodoList
          todos={todos}
          removeTodo={removeTodoFromServer}
        />
      </section>

      {!!todos.length
        && (
          <Footer todosLength={todos.length} />
        )}
    </div>
  );
};
