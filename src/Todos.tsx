import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api';
import { ListFooter } from './ListFooter';
import { Loader } from './Loader';
import { MainSection } from './MainSection';
import { TodosContext } from './TodosProvider';

export const Todos = React.memo(() => {
  const [isLoad, setIsLoad] = useState(false);
  const { userId, todos, setTodos } = useContext(TodosContext);
  const [erorLoad, setErorLoad] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getTodos(userId)
      .then(userTodos => {
        setTodos(userTodos);
        setIsLoad(true);
        setIsUpdate(true);
      })
      .catch(() => {
        setIsUpdate(false);
        setIsLoad(false);
        setErorLoad(true);
      });
  }, [userId]);

  useEffect(() => {
    return () => {
      setTodos([]);
      setIsUpdate(false);
      setIsLoad(false);
    };
  }, []);

  useEffect(() => {
    setIsUpdate(true);
  });

  return (
    <>
      {isLoad && todos.length !== 0 && (
        <>
          <MainSection />
          <ListFooter />
        </>
      )}

      {(!isLoad && isUpdate) && (<Loader />)}
      {erorLoad && (
        <div className="error-todos">
          Error loading todos
        </div>
      )}
    </>
  );
});
