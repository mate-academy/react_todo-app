import { Route, Routes, Link } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <header>
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<App />} />
            <Route path=":type" element={<App />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};
