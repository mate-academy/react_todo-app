import React, { useContext, useState } from 'react';
import { TodosContext } from './TodosContext';

export const TodoInput: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const [todoTitle, setTodoTitle] = useState('');

  const biggestId = () => {
    if (todos.length === 0) {
      return 1;
    }

    const justId = todos.map(todo => todo.id);

    return Math.max(...justId) + 1;
  };

  const AddNewTodo = () => {
    if (!todoTitle.trim()) {
      return;
    }

    return setTodos([
      {
        id: biggestId(),
        title: todoTitle,
        completed: false,
      },
      ...todos,
    ]);
  };

  const handleSubmit = (event: React.FocusEvent<HTMLFormElement>) => {
    event.preventDefault();

    AddNewTodo();

    setTodoTitle('');
  };

  return (
    <>
      <p className="panel-heading">todos list</p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <form onSubmit={handleSubmit}>
            <input
              value={todoTitle}
              className="input is-primary"
              type="text"
              placeholder="What needs to be done?"
              onChange={event => setTodoTitle(event.target.value)}
            />
          </form>
          <a className="icon is-left">
            <i className="fas fa-pen-clip"></i>
          </a>
        </p>
      </div>
    </>
  );
};
