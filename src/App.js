import React, { useState } from 'react';
import { Form } from './components/Form';
import { TodoList } from './components/TodoList';
import { ButtonClearCompleted } from './components/ButtonClearCompleted';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem(key)) || initialValue,
  );

  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};

function App() {
  const [initialTodoList, setInitialTodoList] = useLocalStorage('todos', []);
  const [todoList, setTodoList] = useLocalStorage('todos', []);
  const [leftTodo, setLeftTodo] = useState(0);
  const [isShowedList, setIsShowedList] = useState(true);
  const [filterClass, setFilterClass] = useState('all');

  const addNewTodo = (newTodo) => {
    const newTodoObj = {
      id: +new Date(),
      title: newTodo,
      completed: false,
    };
    const left = initialTodoList.filter(
      todo => todo.completed === false,
    ).length + 1;

    if (filterClass !== 'completed') {
      setTodoList([...todoList, newTodoObj]);
    }

    setInitialTodoList([...initialTodoList, newTodoObj]);
    setLeftTodo(left);
  };

  const handleChecked = (idOfTodo, changedCompleted) => {
    const changedInitialTodos = initialTodoList.map((todo) => {
      if (todo.id === idOfTodo) {
        return {
          ...todo,
          completed: changedCompleted,
        };
      }

      return { ...todo };
    });

    const left = changedInitialTodos.filter(
      todo => todo.completed === false,
    ).length;

    setInitialTodoList(changedInitialTodos);
    setLeftTodo(left);

    if (filterClass === 'all') {
      setTodoList(changedInitialTodos);
    } else {
      const filter = filterClass === 'completed';
      const filteredList = changedInitialTodos.filter(
        todo => todo.completed === filter,
      );

      setTodoList(filteredList);
    }
  };

  const deleteTodo = (idOfTodo) => {
    const initialTodoListAfterDelete = initialTodoList.filter(
      todo => todo.id !== idOfTodo,
    );

    const todoListAfterDelete = todoList.filter(
      todo => todo.id !== idOfTodo,
    );

    const left = initialTodoListAfterDelete.filter(
      todo => todo.completed === false,
    ).length;

    setInitialTodoList(initialTodoListAfterDelete);
    setTodoList(todoListAfterDelete);
    setLeftTodo(left);
  };

  const changeTodoTitle = (idOfTodo, editedTitle) => {
    const changedInitialTodos = initialTodoList.map((todo) => {
      if (todo.id === idOfTodo) {
        return {
          ...todo,
          title: editedTitle,
        };
      }

      return { ...todo };
    });

    const changedTodos = todoList.map((todo) => {
      if (todo.id === idOfTodo) {
        return {
          ...todo,
          title: editedTitle,
        };
      }

      return { ...todo };
    });

    setInitialTodoList(changedInitialTodos);
    setTodoList(changedTodos);
  };

  const clearCompleted = () => {
    const todoListWithoutCompleted = initialTodoList.filter(
      todo => todo.completed === false,
    );

    setTodoList(todoListWithoutCompleted);
    setInitialTodoList(todoListWithoutCompleted);
  };

  const filterBy = (parametr) => {
    setFilterClass(parametr);

    if (parametr === 'all') {
      setTodoList(initialTodoList);
    } else {
      const filter = parametr === 'completed';
      const filteredList = initialTodoList.filter(
        todo => todo.completed === filter,
      );

      setTodoList(filteredList);
    }
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form addNewTodo={addNewTodo} />
      </header>

      {!!initialTodoList.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={() => setIsShowedList(!isShowedList)}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            {isShowedList && (
              <TodoList
                todoList={todoList}
                handleChecked={handleChecked}
                deleteTodo={deleteTodo}
                changeTodoTitle={changeTodoTitle}
              />
            )}
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${leftTodo} items left`}
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={filterClass === 'all' ? 'selected' : ''}
                  onClick={() => filterBy('all')}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={filterClass === 'active' ? 'selected' : ''}
                  onClick={() => filterBy('active')}
                >
                  Active
                </a>
              </li>

              <li>
                <a
                  href="#/completed"
                  className={filterClass === 'completed' ? 'selected' : ''}
                  onClick={() => filterBy('completed')}
                >
                  Completed
                </a>
              </li>
            </ul>

            <ButtonClearCompleted clearCompleted={clearCompleted} />
          </footer>
        </>
      )}
    </section>
  );
}

export default App;
