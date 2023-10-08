/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { TodosFilter } from './TodosFilter';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { ToglerAllTodos } from './ToglerAllTodos';
import { Todo } from '../types/Todo';
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateStatusTodo,
  updateTitleTodo,
} from '../services/todos';

const USER_ID = 6650;

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

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

  const removeTodoFromServer = async (id: number) => {
    try {
      await deleteTodo(id);
      await getTodosFromServer();
    } catch {
      console.warn('error of delete todo from server!');
    }
  };

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

    return addTodoToServer();
  };

  const updateStatusTodoOnServer = async (id: number, status: boolean) => {
    try {
      await updateStatusTodo(id, !status);
      await getTodosFromServer();
    } catch {
      console.warn('unable to update todo status');
    }
  };

  const updateStatusAllTodosOnServer = async () => {
    try {
      const processingTodos = activeTodos.length
        ? activeTodos
        : todos;

      await Promise.all(processingTodos
        .map(todo => updateStatusTodoOnServer(todo.id, todo.completed)));
      await getTodosFromServer();
    } catch {
      console.warn('unable to update all todos status');
    }
  };

  const updateTitleTodoOnServer = async (id: number, title: string) => {
    try {
      await updateTitleTodo(id, title);
      await getTodosFromServer();
    } catch {
      console.warn('unable to update title todo');
    }
  };

  const removeAllCompletedTodosFromServer = async () => {
    try {
      const processingTodos = todos.filter(todo => todo.completed);

      await Promise.all(processingTodos
        .map(todo => removeTodoFromServer(todo.id)));
      await getTodosFromServer();
    } catch {
      console.warn('unable to delete all completed todos');
    }
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
           <ToglerAllTodos
             activeTodosListLength={activeTodos.length}
             updateStatusAllTodosOnServer={updateStatusAllTodosOnServer}
           />
         )}

        <TodoList
          todos={todos}
          removeTodoFromServer={removeTodoFromServer}
          updateStatusTodoOnServer={updateStatusTodoOnServer}
          updateTitleTodoOnServer={updateTitleTodoOnServer}
        />
      </section>

      {!!todos.length
        && (
          <TodosFilter
            activeTodosLength={activeTodos.length}
            completedTodosLength={completedTodos.length}
            removeAllCompletedTodosFromServer={
              removeAllCompletedTodosFromServer
            }
          />
        )}
    </div>
  );
};
