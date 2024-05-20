/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './types/Todo';
import { useLocalStorage } from './Hooks/useLocalStorage';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoFilter, setTodoFilter] = useState<Status>(Status.All);

  const addTodo = (title: string) => {
    const newTodo = {
      id: +Date.now(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(
      todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  const clearCompleted = () => {
    const activeTodos = todos.filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header addTodo={addTodo} todos={todos} setTodos={setTodos} />
        <TodoList
          todos={todos}
          todoFilter={todoFilter}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        {todos.length !== 0 && (
          <Footer
            todoFilter={todoFilter}
            setTodoFilter={setTodoFilter}
            activeTodosCount={activeTodosCount}
            hasCompletedTodos={hasCompletedTodos}
            clearCompleted={clearCompleted}
          />
        )}
      </div>
    </div>
  );
};
