import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { ToggleAll } from './components/ToggleAll/ToggleAll';

function App() {
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState([]);

  useEffect(() => {
    setRender(todos);
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const onDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const checkCompeted = todos.filter(
    todo => !todo.completed,
  ).length;

  const onToggleTodos = (currentCompleted) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: currentCompleted,
    })));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const onCheckedTodos = (currentTodo) => {
    const checkedTodos = todos.map(
      todo => ((todo.id === currentTodo.id) ? currentTodo : todo),
    );

    setTodos(checkedTodos);
  };

  const onFilter = (field) => {
    let filteredTodo;

    switch (field) {
      case 'active':
        filteredTodo = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodo = todos.filter(todo => todo.completed);
        break;
      default:
        filteredTodo = [...todos];
    }

    setRender(filteredTodo);
  };

  const onEditTodo = (editTodo) => {
    setTodos(todos.map(todo => (
      todo.id === editTodo.id ? editTodo : todo
    )));
  };

  return (
    <section className="todoapp">
      <Header onAddTodo={addTodo} />
      <section className="main">
        <ToggleAll
          checkCompeted={checkCompeted}
          onToggleTodos={onToggleTodos}
        />
        <TodoList
          todos={render}
          onCheckedTodos={onCheckedTodos}
          onDelete={onDelete}
          onEditTodo={onEditTodo}
        />
      </section>
      <footer className="footer">
        <TodosFilter
          checkCompeted={checkCompeted}
          onFilter={onFilter}
          handleClearCompleted={handleClearCompleted}
        />
      </footer>
    </section>

  );
}

export default App;
