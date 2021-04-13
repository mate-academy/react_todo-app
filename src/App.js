import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { useLocalStorage } from './hooks/hooks';

export function App() {
  const [data, setDataHooks] = useLocalStorage('todos', []);
  const [visibleData, setVisibleData] = useState([]);

  useEffect(() => {
    setVisibleData(data);
  }, []);

  useEffect(() => {
    setVisibleData(data);
  }, [data]);

  const updateData = (newData) => {
    setDataHooks([...data, newData]);
  };

  const updateTitle = (postId, newTitle) => {
    const findPost = visibleData.find(post => post.id === postId);

    findPost.title = newTitle;
  };

  const deletePost = (postId) => {
    setDataHooks(data.filter(post => post.id !== postId));
  };

  const changeCheckox = (postId, newChecked) => {
    const updatedPost = visibleData.find(post => post.id === postId);

    updatedPost.completed = newChecked;
  };

  const filterData = (filterBy) => {
    if (filterBy === undefined) {
      setVisibleData(data);
    } else {
      setVisibleData(data
        .filter(post => post.completed === filterBy));
    }
  };

  const clearAllCompleted = () => {
    setDataHooks(data.filter(post => post.completed !== true));
  };

  return (
    <section className="todoapp">
      <Header
        onSubmit={updateData}
        newId={data.length + 1}
      />

      <Main
        data={visibleData}
        changeCheckob={changeCheckox}
        onDelete={deletePost}
        onUpdateTitle={updateTitle}
      />

      {visibleData.length > 0 && (
        <Footer
          filterData={filterData}
          itemsLength={visibleData.length}
          clearAllCompleted={clearAllCompleted}
        />
      )}
    </section>
  );
}
