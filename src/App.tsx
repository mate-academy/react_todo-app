import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TodoApp } from './components/TodoApp/TodoApp';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const { pathname } = useLocation();

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  useEffect(() => {
    switch (pathname) {
      case '/':
        setVisibleTodos(todos);
        break;
      case '/completed':
        setVisibleTodos(() => todos.filter(todo => todo.completed));
        break;
      case '/active':
        setVisibleTodos(todos.filter(todo => !todo.completed));
        break;
      default:
        break;
    }
  }, [pathname, todos]);

  const addNewTodo = (newTodo: Todo) => {
    setTodos((currentTodos) => ([...currentTodos, newTodo]));
  };

  const toggleTodoStatus = (todoId: number) => {
    setTodos((currentTodos) => currentTodos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    }));
  };

  const toggleAllTodosStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTodos((currentTodos) => currentTodos.map((todo) => (
        { ...todo, completed: true }
      )));
    } else {
      setTodos((currentTodos) => currentTodos.map((todo) => (
        { ...todo, completed: false }
      )));
    }
  };

  const deleteTodo = (todoId: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(() => ([...filteredTodos]));
  };

  const deleteCompleted = () => {
    setTodos(() => ([...activeTodos]));
  };

  const editTodo = (editedTitle: string, todoId: number) => {
    setTodos((currentTodos) => currentTodos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, title: editedTitle };
      }

      return todo;
    }));
  };

  return (
    <div className="todoapp">
      <TodoApp addNewTodo={addNewTodo} />
      <TodoList
        todos={visibleTodos}
        toggleTodoStatus={toggleTodoStatus}
        toggleAllTodosStatus={toggleAllTodosStatus}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      <TodoFilter
        deleteCompleted={deleteCompleted}
        activeTodos={activeTodos}
        completedTodos={completedTodos}
      />
    </div>
  );
};
