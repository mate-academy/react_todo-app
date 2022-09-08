import React, { useContext, useState } from 'react';
import { Form } from './Form';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';

export const Todos = React.memo(() => {
  const { todos } = useContext(TodosContext);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <Form setHasError={setHasError} setErrorMessage={setErrorMessage} />
      </header>
      {todos.length > 0
        && (
          <TodoList
            hasError={hasError}
            errorMessage={errorMessage}
            setHasError={setHasError}
          />
        )}
    </div>
  );
});
