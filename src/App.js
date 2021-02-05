import React, { useEffect, useState } from 'react';
import { TodoApp } from './Component/Header/TodoApp';
import { TodoList } from './Component/Main/TodoList';
import { TodoFilter } from './Component/Footer/TodosFilter';
import './styles/filters.css';
import './styles/index.css';
import './styles/todo-list.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setItems([...todos]);
  }, [todos]);

  const onFilter = (comand) => {
    setFilter(comand);
    switch (comand) {
      case 'active':
        setItems([...todos]);

        return setItems(items.filter(item => item.completed === false));

      case 'completed':
        setItems([...todos]);

        return setItems(items.filter(item => item.completed === true));

      default:

        return setItems([...todos]);
    }
  };

  const onRemoveCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  const addTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodo = (removeTodoID) => {
    setTodos(todos.filter(todo => todo.id !== +removeTodoID));
  };

  const completeTodo = (isCopleted) => {
    setTodos(todos.map((todo) => {
      if (todo.id === isCopleted) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const completeAllTodo = (comandAll) => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: comandAll,
    })));
  };

  return (

    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <TodoApp
          onAdd={addTodo}
          todos={todos}
        />
      </header>

      <section className="main">
        <TodoList
          items={items}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
          completeAllTodo={completeAllTodo}
        />
      </section>

      <TodoFilter
        todos={todos}
        filter={filter}
        onFilter={onFilter}
        onRemoveCompleted={onRemoveCompleted}
      />

    </section>
  );
}

export default App;
