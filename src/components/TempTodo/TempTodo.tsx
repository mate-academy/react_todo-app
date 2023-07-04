import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';

interface Props {
  title: string;
}

export const TempTodo: React.FC<Props> = ({ title }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {!loading && <input type="text" value={title} disabled />}
      {loading && <Loader />}
    </div>
  );
};
