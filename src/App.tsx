/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoListContext } from './context/TodoListContext';
import { TodoStatus } from './types/TodoStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState<TodoStatus>(TodoStatus.All);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case TodoStatus.Active:
          return !todo.completed;
        case TodoStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [filterBy, todos]);

  const addTodo = useCallback((newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  }, [todos]);

  const handleCompleted = useCallback((
    todoId: number,
  ) => {
    setTodos(todos.map(todo => {
      return todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo;
    }));
  }, [todos]);

  const handleTodoRename = useCallback(async (
    title: string,
    todoId: number,
  ) => {
    setTodos(todos.map(todo => {
      return todo.id === todoId
        ? { ...todo, title }
        : todo;
    }));
  }, [todos]);

  const handleDeletedTodo = useCallback((todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }, [todos]);

  return (
    <div className="todoapp">
      <Header onSubmit={addTodo} todos={todos} setTodos={setTodos} />

      {todos.length > 0 && (
        <>
          <TodoListContext.Provider value={{
            visibleTodos,
            handleTodoRename,
            handleCompleted,
            handleDeletedTodo,
          }}
          >
            <TodoList />
          </TodoListContext.Provider>

          <Footer
            todos={todos}
            setTodos={setTodos}
            todoFilter={filterBy}
            setFilterBy={setFilterBy}
          />
        </>
      )}
    </div>
  );
};
