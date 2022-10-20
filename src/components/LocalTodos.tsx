/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export const LocalTodos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoInput, setNewTodoInput] = useState('');
  const [editableId, setEditableId] = useState('');
  const [editableTitle, setEditableTitle] = useState('');

  useEffect(() => {
    const localTodos = JSON.parse(localStorage.getItem('todos') || '{}');

    if (localTodos.length > 0) {
      setTodos(JSON.parse(localStorage.getItem('todos') || '{}'));
    }

    if (editableId.length === 0) {
      const mainInput = document.querySelector('.new-todo') as HTMLElement;

      if (mainInput) {
        mainInput.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (editableId.length) {
      const editInput = document.querySelector('#editableTodo') as HTMLElement;

      if (editInput) {
        editInput.focus();
      }
    }
  }, [editableId]);

  const removeHandler = (todoId:string) => {
    const updatedTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const makeThisEditable = (todoId:string, todoTitle:string) => {
    setEditableId(todoId);
    setEditableTitle(todoTitle);
  };

  const editableTodoHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditableTitle(event.target.value);
  };

  const handleBlur = () => {
    console.log('blur detected');

    console.log(editableId, todos.find(todo => todo.id === editableId));

    console.log(editableTitle);

    const editableTodo = todos.find(todo => todo.id === editableId);

    if (editableTodo) {
      editableTodo.title = editableTitle;
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    // const updatedTodos = [...todos].splice(+editableId, 1, updatedTodo);

    // setTodos(updatedTodos);

    /*    const originalTodoIndex = todos.findIndex(todo => todo.id === editableId);

    if (todos[originalTodoIndex].title !== editableTitle) {
      const updatedTodo = { ...todos[originalTodoIndex], title: editableTitle };

      const updatedTodos = [...todos].splice(originalTodoIndex, 1, updatedTodo);

      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
    }
*/
    setEditableTitle('');
    setEditableId('');

    const editInput = document.querySelector('#editableTodo') as HTMLElement;

    if (editInput) {
      editInput.blur();
    }
  };

  const handleCompleted = (todoId:string) => {
    const selectedTodoIndex = todos.findIndex(todo => todo.id === todoId);

    const updatedTodo = todos[selectedTodoIndex];

    updatedTodo.completed = !updatedTodo.completed;

    const newTodos = [...todos];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const todoMarkup = (todo:Todo) => {
    return todo.id === editableId
      ? (
        <li
          className="editing"
          key={todo.id}
          onBlur={handleBlur}
        >
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label>{editableTitle}</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input
            type="text"
            className="edit"
            id="editableTodo"
            value={editableTitle}
            onChange={editableTodoHandle}
          />
        </li>
      )
      : (
        <li
          key={todo.id}
          className={classNames({ completed: todo.completed })}
        >
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id)}
            />
            <label onDoubleClick={() => makeThisEditable(todo.id, todo.title)}>
              {todo.title}
            </label>
            <button
              type="button"
              className="destroy"
              data-cy="deleteTodo"
              onClick={() => removeHandler(todo.id)}
            />
          </div>
          <input type="text" className="edit" />
        </li>
      );
  };

  const newTodoInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoInput(event.target.value);
    console.log(newTodoInput);
  };

  const handleNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    console.log('event submitted');
    event.preventDefault();

    if (newTodoInput.length > 0) {
      const NewTodo = {
        id: `${Math.floor(Math.random() * 10000)}`,
        title: newTodoInput,
        completed: false,
      };
      const NewTodos = [NewTodo, ...todos];

      setTodos(NewTodos);
      localStorage.setItem('todos', JSON.stringify(NewTodos));
      setNewTodoInput('');
    }
  };

  const clearCompleted = () => {
    const newTodos = [...todos.filter(todo => !todo.completed)];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <>
      <h1 className="title">These are your</h1>
      <div className="todoapp">
        <header className="header">
          <h1>Local Todos</h1>

          <form
            onSubmit={handleNewTodo}
          >
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodoInput}
              onChange={newTodoInputHandle}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list" data-cy="todoList">
            {todos.map(todo => todoMarkup(todo))}
          </ul>
        </section>

        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.filter(todo => !todo.completed).length} items left`}
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected">All</a>
            </li>

            <li>
              <a href="#/active">Active</a>
            </li>

            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed" onClick={clearCompleted}>
            Clear completed
          </button>
        </footer>
      </div>
    </>
  );
};
