import React, { useState, useEffect } from 'react';
import { useGetLocalStorage, useSetLocalStorage } from './Components/localStorage';
import { Form } from './Components/Form/Form';
import { TodoList } from './Components/TodoList/TodoList';
import { TodosFilter } from './Components/TodosFilter/TodosFilter';

function App() {
  const [query, handleQuery] = useState('');
  const [activeCheckbox, checkboxHandler] = useState(false);
  const [filterBy, selectFilterType] = useState('');

  const [storage, setStorage] = useState([]);
  const [todos, setTodos] = useState([]);

  useSetLocalStorage('todos', todos)

  const currentStorageData = useGetLocalStorage('todos');

  useEffect(() => { 
    setStorage(currentStorageData)
  }, [todos])

  console.log(storage);

  

  // console.log(useGetLocalStorage('todos'));

  const getFilteredTodos = (value) => {
    switch(value) {
      case 'completed':
        return todos.filter(todo => todo.completed)

      case 'uncompleted':
        return todos.filter(todo => !todo.completed)

      default:
        case 'all':
        return todos;
    }
  }

  const filteredTodos = getFilteredTodos(filterBy)

  const toggleCheckbox = () => {
    if (activeCheckbox) {
      checkboxHandler(false)
    } else {
      checkboxHandler(true)
    }
  }

  useEffect(() => {
    if (activeCheckbox) {
      setTodos(todos
        .map(todo => ({
          ...todo,
          completed: true,
        }))
      )
    } else {
      setTodos(todos
        .map(todo => ({
          ...todo,
          completed: false,
        }))
      )
    }

   return () => {
     console.log(`unmounted ${activeCheckbox}`);
   }
  }, [activeCheckbox])
  

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form
          handleQuery={handleQuery}
          query={query}
          setTodos={setTodos}
          todos={todos}
        />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          defaultChecked={activeCheckbox}
          onChange={toggleCheckbox}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        {todos.length !== 0 && (
          <TodoList
            todos={filteredTodos}
            setTodos={setTodos}
          />
        )}
      </section>

      {todos.length > 0 && (
      <TodosFilter
        todos={todos}
        selectFilterType={selectFilterType}
        removeCompleted={setTodos}
        filterBy={filterBy}
      />
      )}
    </section>
  );
}

export default App;
