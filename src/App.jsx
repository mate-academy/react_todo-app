import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import {
  getUser, getUserTodos, changeTodoOnServer, createTodo, deleteTodo,
} from './api/getData';

function App() {
  const [allTodos, setAllTodos] = useState([]);
  const [userName, setUserName] = useState('');
  const [active, setActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [checkedAllCompleted, setCheckedAllCompleted] = useState(false);
  const [hiddenBtnDelCompleted, setHiddenBtnDelCompleted] = useState(false);
  const [countUncompleted, setCountUncompleted] = useState(0);
  const [userId] = useState(3860);

  useEffect(() => {
    getUser(userId)
      .then(user => setUserName(user.name.split(' ')[0]));
    onChangeTodos();
  }, []);

  useEffect(() => {
    setCheckedAllCompleted(allTodos.every(todo => todo.completed));
    setHiddenBtnDelCompleted(allTodos.some(todo => todo.completed));
    setCountUncompleted(allTodos.reduce((sumFalse, todo) => {
      let count = sumFalse;

      return (!todo.completed) ? (count += 1) : count;
    }, 0));
  }, [allTodos]);

  const filterActive = useCallback(() => {
    setActive(true);
    setCompleted(false);
  });

  const filterCompleted = useCallback(() => {
    setActive(false);
    setCompleted(true);
  });

  const filterAll = useCallback(() => {
    setActive(false);
    setCompleted(false);
  });

  const filter = useMemo(() => {
    switch (true) {
      case active:
        return allTodos.filter(todo => !todo.completed);
      case completed:
        return allTodos.filter(todo => todo.completed);
      default:
        return allTodos;
    }
  }, [active, completed, allTodos]);

  const onChangeTodos = useCallback(() => {
    getUserTodos(userId)
      .then((todos) => {
        setAllTodos(todos);
      });
  }, []);

  const changeAllCompleted = useCallback((status) => {
    if (allTodos.length > 0) {
      allTodos.forEach((el) => {
        changeTodo(el.id, { completed: status });
      });
    }
  }, [allTodos]);

  const changeTodo = useCallback((id, changePart) => {
    changeTodoOnServer(id, changePart)
      .then(() => onChangeTodos());
  }, []);

  const onCreateTodo = useCallback((data) => {
    createTodo(data, userId)
      .then(() => onChangeTodos());
  }, []);

  const removeTodo = useCallback((id) => {
    deleteTodo(id)
      .then(() => onChangeTodos());
  }, []);

  const removeCompleted = useCallback(() => {
    if (allTodos.length > 0) {
      allTodos.forEach((el) => {
        if (el.completed) {
          removeTodo(el.id);
        }
      });
    }
  }, [allTodos]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>
          {`${userName}'s todos`}

        </h1>
        <TodoApp
          userId={userId}
          onCreateTodo={onCreateTodo}
        />
      </header>
      <section className="main">
        <TodoList
          items={filter}
          removeTodo={removeTodo}
          changeTodo={changeTodo}
          changeAllCompleted={changeAllCompleted}
          checkedAllCompleted={checkedAllCompleted}
        />
      </section>
      {allTodos[0] && (
      <footer className="footer">

        <TodosFilter
          removeCompleted={removeCompleted}
          countUncompleted={countUncompleted}
          filterActive={filterActive}
          filterCompleted={filterCompleted}
          filterAll={filterAll}
          hiddenBtnDeleteCompleted={hiddenBtnDelCompleted}
        />

      </footer>
      )}
    </section>
  );
}

export default App;
