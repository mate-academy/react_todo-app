import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { useLocalStorageState } from '../localStorage';

export const TodoApp = () => {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useLocalStorageState('todoList', []);
  const [allTodosCompleted, setAllTodosCompleted] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const unCompletedTodos = todoList.filter(todo => !todo.completed);

  const toggleAll = () => {
    const completedTodos = todoList.map(todo => ({
      ...todo, completed: !allTodosCompleted,
    }));

    setTodoList(completedTodos);
    setAllTodosCompleted(!allTodosCompleted);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (inputText) {
      const todo = {
        id: +new Date(),
        title: inputText,
        completed: false,
      };

      setTodoList([...todoList, todo]);
      setInputText('');
    }
  };

  const updateTodo = (newValue, todoToUpdateId) => {
    if (!newValue) {
      return;
    }

    const updatedTodos = todoList.map((todo) => {
      if (todo.id !== todoToUpdateId) {
        return todo;
      }

      return {
        ...todo,
        title: newValue,
      };
    });

    setTodoList(updatedTodos);
  };

  const toggleCompleted = (completedTodoId) => {
    const todoToChange = todoList.find(todo => todo.id === completedTodoId);
    const status = todoToChange.completed;

    const updatedTodoList = todoList.map((todo) => {
      if (todo.id !== completedTodoId) {
        return todo;
      }

      return {
        ...todo,
        completed: !status,
      };
    });

    setTodoList(updatedTodoList);
  };

  const removeTodo = (removedTodoId) => {
    const newTodos = todoList.filter(todo => todo.id !== removedTodoId);

    setTodoList(newTodos);
  };

  const filteredTodos = (type) => {
    let todos;

    switch (type) {
      case 'all':
        todos = [...todoList];
        break;
      case 'active':
        todos = [...todoList].filter(todo => !todo.completed);
        break;
      case 'completed':
        todos = [...todoList].filter(todo => todo.completed);
        break;

      default:
        break;
    }

    return todos;
  };

  const setFilter = (newType) => {
    setFilterType(newType);
  };

  const clearCompleted = () => {
    const onlyInCompletedTodos = todoList.filter(todo => !todo.completed);

    setTodoList(onlyInCompletedTodos);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={addTodo}
        >
          <input
            type="text"
            value={inputText}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
        </form>
      </header>

      {todoList.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              checked={unCompletedTodos.length === 0}
              id="toggle-all"
              className="toggle-all"
              onClick={() => {
                toggleAll();
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

          </section>
          <TodoList
            todoList={filteredTodos(filterType)}
            onCompleted={toggleCompleted}
            onRemove={removeTodo}
            onUpdate={updateTodo}
          />
          <footer className="footer">
            {unCompletedTodos.length === 1 ? (
              <span className="todo-count">
                {unCompletedTodos.length}
                &nbsp;item left
              </span>
            ) : (
              <span className="todo-count">
                {unCompletedTodos.length}
                &nbsp;items left
              </span>
            )}

            <TodosFilter onFilter={setFilter} />

            <button
              type="button"
              className="clear-completed"
              onClick={() => {
                clearCompleted();
              }}
            >
              Clear completed
            </button>
          </footer>
        </>
      )}
    </>
  );
};
