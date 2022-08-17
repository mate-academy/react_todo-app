import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api';
import { ListFooter } from './ListFooter';
import { Loader } from './Loader';
import { MainSection } from './MainSection';
import { TodosContext } from './TodosProvider';

export const Todos = React.memo(() => {
  const [isLoad, setIsLoad] = useState(false);
  const {
    userId, todos, setTodos, setUserId,
  } = useContext(TodosContext);
  const [erorLoad, setErorLoad] = useState(false);

  useEffect(() => {
    getTodos(userId)
      .then(userTodos => {
        setTodos(userTodos);
        setIsLoad(true);
      })
      .catch(() => {
        setIsLoad(false);
        setErorLoad(true);
      });
  }, [userId]);

  useEffect(() => {
    return () => {
      setTodos([]);
      setUserId(0);
    };
  }, []);

  return (
    <>
      {isLoad && todos.length !== 0 && (
        <>
          <MainSection />
          <ListFooter />
        </>
      )}

      {((!isLoad && todos.length === 0)
        && !(isLoad && todos.length !== 0)) && (<Loader />)}
      {erorLoad && (
        <div className="error-todos">
          Error loading todos
        </div>
      )}
    </>
  );
});
