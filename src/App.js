import React, { useState, useEffect } from 'react';
import { TextBar } from './components/TextBar';
import { TodoList } from './components/TodoList';
import { ControlBar } from './components/ContorlBar';

function App() {

  const [todos, setTodos] = useState([]);
  const [filterType, setFilterType] = useState('All');

  const todosHandler = (title) => {
    if (title !== '') {
      setTodos([...todos, makeTodo(title)]);
    }
  }

  const makeTodo = (title) => (
    {
      title: title,
      id: +new Date(),
      completed: false,
    }
  )

  useEffect(() => {
    console.log(todos);
  }, [todos])

  const renameTodo = (todo, newTitle) => {
    todos[findItem(todo)].title = newTitle;
  }

  const deleteTodo = (todo) => {
    setTodos(todos.filter(item => item.id !== todo.id));
  }

  const checkTodo = (todo) => {
    const todoStatus = todos[findItem(todo)].completed;
    todos[findItem(todo)].completed = !todoStatus
    setTodos([...todos]);
  }

  const findItem = (item) => {
    return todos.indexOf(item);
  }

  const filterTodos = (type) => {
    switch(type) {
      case 'All': return todos;
      case 'Active': return todos.filter(todo => !todo.completed);
      case 'Completed': return todos.filter(todo => todo.completed);
    }
  }

  const filterByAll = () => {
    setFilterType('All');
  }

  const filterByActive = () => {
    setFilterType('Active');
  }

  const filterByCompleted = () => {
    setFilterType('Completed');
  }

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  return (
    <section className="todoapp">

      <TextBar senderTodo={todosHandler} />
      {!!todos.length &&
        <TodoList
          items={filterTodos(filterType)}
          renameTitle={renameTodo}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
        />
      }
      <ControlBar
        itemsCount={todos.filter(todo => !todo.completed).length}
        filterByActive={filterByActive}
        filterByCompleted={filterByCompleted}
        filterByAll={filterByAll}
        filterType={filterType}
        clearCompleted={clearCompletedTodos}
      />
    </section>
  );
}

export default App;
