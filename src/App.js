import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { TodoApp } from './components/TodoApp';

const basicTodos = [
  { id: 1,
    title: 'first todo',
    completed: false },
  { id: 2,
    title: 'second todo',
    completed: true },
];

function App() {
  const [todos, setTodos] = useState(basicTodos);
  // const [filterForTodos, setFilterForTodos] = useState([...todos]);

  // useEffect(() => {
  //   setFilterForTodos(todos => (
  //     fileteforTodos === 'All'
  //       ? prevTodos
  //       : prevTodos.filter(todo => (
  //         fileteforTodos === 'Comleted'
  //           ? todo.completed
  //           : !todo.completed
  //       ))
  //   ));
  // }, [fileteforTodos]);

  return (
    <TodoApp
      todos={todos}
      setTodos={setTodos}
      // filterForTodos={filterForTodos}
      // setFilterForTodos={setFilterForTodos}
    />
  );
}

export default App;
