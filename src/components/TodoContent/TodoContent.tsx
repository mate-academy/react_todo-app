import { FC, useContext } from 'react';

import { TodoHeader } from '../Header/TodoHeader';
import { TodoMain } from '../Main/TodoMain';
import { TodoFooter } from '../Footer/TodoFooter';

import { TodoContext } from '../../Context/TodoContext';

export const TodoContent: FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp__content">
      <TodoHeader />
      {todos.length > 0 && (
        <>
          <TodoMain />

          <TodoFooter />
        </>
      )}
    </div>
  );
};
