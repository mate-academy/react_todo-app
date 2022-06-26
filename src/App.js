import React, {useState, useEffect, useCallback} from 'react';
import { TodoApp } from './components/TodoApp';
import { TodosFilter } from './components/TodosFilter';
import { getTodos } from './api/api';
import { AuthWrapper } from './components/auth/AuthWrapper';

function App() {
  const [todos, setTodos] = useState('');
  const [authToken, setAuthToken] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    updateTodos();
  }, []);

  const updateTodos = () => {
    getTodos()
      .then(response => setTodos(response));
  };

  const setAlert = (alertBody) => {
    setShowAlert(alertBody);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const logOut = useCallback((token) => setAuthToken(token));

  return (
    <>
      <div className={`alert alert-${showAlert?.type || ''} ${showAlert ? '' : 'alert-hide'}`}>
          <h3>{showAlert?.title || ''}</h3>
          <p>{showAlert?.message || ''}</p>
      </div>

      {authToken ? (
        <section className="todoapp">
          <TodoApp
            todos={todos}
            setTodos={setTodos}
            setAuthToken={setAuthToken}
          />
          {!!todos.length
            && <TodosFilter todos={todos} updateTodos={updateTodos} />}

          <div onClick={logOut}>log out</div>
        </section>
      ) : (
        <AuthWrapper setAuthToken={setAuthToken} setAlert={setAlert} />
      )}
    </>
  );
}

export default App;
