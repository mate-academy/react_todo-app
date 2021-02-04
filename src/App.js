import React, { useState, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
// import data from './data/data.json';

function App() {
  const [todos, setTodos] = useState([]);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const saveTodos = localStorage.getItem('todos');

    if (saveTodos) {
      setTodos(JSON.parse(saveTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));

    if (todos.length > 0) {
      setIsFooterVisible(true);
    } else {
      setIsFooterVisible(false);
    }

    setIsFooterVisible(todos.length > 0);
  }, [todos]);

  const onAll = () => {
    setTodos(todos);
  };

  const onActive = () => {
    const active = [...todos].filter(t => !t.completed);

    setTodos(active);
  };

  const onCompleted = () => {
    const completed = [...todos].filter(t => t.completed);

    setTodos(completed);
  };

  const onClearAll = () => {
    const clearCompleted = [...todos].filter(t => !t.completed);

    setTodos(clearCompleted);
  };

  const addTodo = (newTodo) => {
    if (todos && todos
      .some(todo => (todo.title === newTodo.title))) {
      return;
    }

    if (newTodo.title) {
      setTodos([...todos, newTodo]);
    }
  };

  const deleteTodo = (idx) => {
    const newTodos = todos.filter((_, index) => index !== idx);

    setTodos(newTodos);
  };

  const leftTodos = [...todos].filter(t => t.completed).length;

  return (
    <section className="todoapp">
      <Header todos={todos} onAddNewTodo={addTodo} />

      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
      />

      {isFooterVisible && (
        <Footer
          leftTodos={leftTodos}
          onAll={onAll}
          onActive={onActive}
          onCompleted={onCompleted}
          onClearAll={onClearAll}
        />
      )}

    </section>
  );
}

export default App;
