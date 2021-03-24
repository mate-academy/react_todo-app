import React, { useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Form } from './components/Form';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/useLocalStorage';

export function App() {
  const [todos, setNewTodo] = useLocalStorage('todos', []);
  const [renderedTodos, setRenderedTodos] = useState([]);

  useEffect(() => {
    setRenderedTodos(todos);
  }, [todos]);

  const addNewTodo = useCallback(todo => setNewTodo([...todos, todo]), [todos]);

  const handleCheckedTodos = useCallback((todo) => {
    const checkedTodos = todos.map(
      item => ((item.id === todo.id) ? todo : item),
    );

    setNewTodo(checkedTodos);
  }, [todos]);

  const activeTodos = todos.filter(
    todo => !todo.completed,
  ).length;

  const toggleAllTodos = useCallback((currentState) => {
    setNewTodo(todos.map(todo => ({
      ...todo,
      completed: currentState,
    })));
  }, [todos]);

  const handleFilterTodosByState = useCallback((currentState) => {
    switch (currentState) {
      case 'active':
        setRenderedTodos(todos.filter(todo => !todo.completed));
        break;

      case 'completed':
        setRenderedTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setRenderedTodos([...todos]);
    }
  }, [todos]);

  const handlerRemoveTodo = useCallback((id) => {
    setNewTodo(todos.filter(todo => todo.id !== id));
  }, [todos]);

  const handlerRemoveCompletedTodos = useCallback(() => {
    setNewTodo(todos.filter(todo => !todo.completed));
  }, [todos]);

  const handlerEditTodoTitle = useCallback((modifiedTodo) => {
    setNewTodo(todos.map(todo => (
      todo.id === modifiedTodo.id ? modifiedTodo : todo
    )));
  }, [todos]);

  return (
    <section className="todoapp">
      <Header />
      <Form onAddTodo={addNewTodo} />
      <Main
        todos={renderedTodos}
        onAddChecked={handleCheckedTodos}
        onRemoveTodo={handlerRemoveTodo}
        pendingToDo={activeTodos}
        activeTodos={activeTodos}
        onToggleTodos={toggleAllTodos}
        onEditTitle={handlerEditTodoTitle}
      />
      {todos.length > 0
        && (
          <Footer
            activeTodos={activeTodos}
            onFilterTodos={handleFilterTodosByState}
            onRemoveCompleted={handlerRemoveCompletedTodos}
            todos={todos}
          />
        )
      }
    </section>
  );
}
