import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

function App() {
  const [title, setTitle] = useState('');
  const [uneditedTitles, setUneditedTitles] = useState({});
  const [toggleAll, setToggleAll] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState('All');
  const filteredList = todoList.filter((todo) => {
    if (filter === 'Active') {
      return !todo.completed;
    }

    if (filter === 'Completed') {
      return todo.completed;
    }

    return true;
  });

  const newTodo = {
    id: +new Date(),
    title,
    completed: false,
  };

  useEffect(() => setTodoList(JSON.parse(localStorage.list)), []);

  useEffect(() => {
    localStorage.list = JSON.stringify(todoList);
    setToggleAll(todoList.every(todo => todo.completed));
  }, [todoList]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            title
            && setTodoList([
              newTodo,
              ...todoList,
            ]);
            setTitle('');
            setToggleAll(todoList.some(todo => !todo.completed));
          }}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title.trimLeft()}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toggleAll}
          onChange={() => {
            setToggleAll(!toggleAll);
            todoList.map((todo, index) => {
              todoList[index].completed = !toggleAll;

              return { ...todo };
            });
            setTodoList([...todoList]);
          }}
        />
        <label
          htmlFor="toggle-all"
          hidden={!todoList.length}
        >
          Mark all as complete
        </label>
        <TodoList
          filteredList={filteredList}
          setUneditedTitles={setUneditedTitles}
          uneditedTitles={uneditedTitles}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      </section>
      <TodosFilter
        todoList={todoList}
        setTodoList={setTodoList}
        filter={filter}
        setFilter={setFilter}
      />
    </section>
  );
}

export default App;
