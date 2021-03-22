import React, { useEffect, useState } from 'react';
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

  const addNewTodo = todo => setNewTodo([...todos, todo]);

  const handleCheckedTodos = (todo) => {
    const checkedTodos = todos.map(
      item => ((item.id === todo.id) ? todo : item),
    );

    setNewTodo(checkedTodos);
  };

  const pendingToDo = todos.filter(
    todo => !todo.completed,
  ).length;

  const toggleAllTodos = (currentState) => {
    setNewTodo(todos.map(todo => ({
      ...todo,
      completed: currentState,
    })));
  };

  const handleFilterTodosByState = (currentState) => {
    let filtered;

    switch (currentState) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;

      default:
        filtered = [...todos];
    }

    setRenderedTodos(filtered);
  };

  const handlerRemoveTodo = (id) => {
    setNewTodo(todos.filter(todo => todo.id !== id));
  };

  const handlerRemoveCompletedTodos = () => {
    setNewTodo(todos.filter(todo => !todo.completed));
  };

  const handlerEditTodoTitle = (modifiedTodo) => {
    setNewTodo(todos.map(todo => (
      todo.id === modifiedTodo.id ? modifiedTodo : todo
    )));
  };

  return (
    <section className="todoapp">
      <Header />
      <Form onAddTodo={addNewTodo} />
      <Main
        todos={renderedTodos}
        onAddChecked={handleCheckedTodos}
        onRemoveTodo={handlerRemoveTodo}
        pendingToDo={pendingToDo}
        onToggleTodos={toggleAllTodos}
        onEditTitle={handlerEditTodoTitle}
      />
      {todos.length > 0
        && (
          <Footer
            quantity={pendingToDo}
            onFilterTodos={handleFilterTodosByState}
            onRemoveCompleted={handlerRemoveCompletedTodos}
            todos={todos}
          />
        )
      }
    </section>
  );
}
