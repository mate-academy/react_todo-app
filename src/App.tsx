import React, { useState } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Modal } from './components/Modal';

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [hasAdd, setHasAdd] = useState(false);
  const [hasClear, setHasClear] = useState(false);

  const setUser = (id: number) => {
    setUserId(id);
  };

  return (
    <>

      <Modal setUser={setUser} />

      {userId > 0 && (
        <div className="todoapp">
          <Header userId={userId} onAdd={setHasAdd} />

          <Routes>
            <Route
              path="/"
              element={(
                <Outlet />
              )}
            >
              <Route
                index
                element={(
                  <Main
                    userId={userId}
                    hasAdd={hasAdd}
                    setHasAdd={setHasAdd}
                    hasClear={hasClear}
                    setHasClear={setHasClear}
                  />
                )}
              />
              <Route
                path=":condition"
                element={(
                  <Main
                    userId={userId}
                    hasAdd={hasAdd}
                    setHasAdd={setHasAdd}
                    hasClear={hasClear}
                    setHasClear={setHasClear}
                  />
                )}
              />
            </Route>
          </Routes>

          <Footer setHasClear={setHasClear} />
        </div>
      )}
    </>
  );
};
