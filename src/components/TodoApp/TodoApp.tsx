import { FC } from 'react';

import { TodoContent } from '../TodoContent/TodoContent';

export const TodoApp: FC = () => {
  return (
    <div className="todoapp">
      <h1 className="todoapp__title">ToDos</h1>

      <TodoContent />
    </div>
  );
};
