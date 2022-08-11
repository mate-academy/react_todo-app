import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { addTodoAction, setTodosAction } from './store';
import { getTodosSelector } from './store/selectors';

const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const todos = useSelector(getTodosSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedData = localStorage.getItem('todos');

    if (cachedData) {
      dispatch(setTodosAction(JSON.parse(cachedData)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addTodoAction({
      id: +new Date(),
      title: todoTitle,
      completed: false,
    }));

    setTodoTitle('');
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <TodoList />
      {!!todos.length && <TodosFilter />}
    </section>
  );
};

export default App;
