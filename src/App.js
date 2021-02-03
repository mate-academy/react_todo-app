import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import data from './data/data.json';

function App() {
  const [todos, setTodos] = useState(data);
  // const [isFooterVisible, setIsFooterVisible] = useState(true);
  // const [isChecked, setIsChecked] = useState(false);

  localStorage.setItem('todos', JSON.stringify(todos));

  useEffect(() => {
    const saveTodos = localStorage.getItem('todos');

    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  }, []);

  const onAll = () => {
    setTodos([...todos]);
  };

  const onActive = () => {
    setTodos([...todos].filter(todo => (
      todo.completed === false
    )));
  };

  const onCompleted = () => {
    const filteredByCompleted = [...todos]
      .filter(todo => (todo.completed === true));

    setTodos(filteredByCompleted);
  };

  const onClearAll = () => {
    setTodos([]);
  };

  const addTodo = (newTodo) => {
    if (todos && todos
      .some(todo => (todo.title === newTodo.title))) {
      return;
    }

    if (todos) {
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (idx) => {
    const newTodos = todos.filter((_, index) => index !== idx);

    setTodos(newTodos);
  };

  return (
    <section className="todoapp">
      <Header todos={todos} onAddNewTodo={addTodo} />

      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
      />

      <Footer
        onAll={onAll}
        onActive={onActive}
        onCompleted={onCompleted}
        onClearAll={onClearAll}
      />

    </section>
  );
}

export default App;
