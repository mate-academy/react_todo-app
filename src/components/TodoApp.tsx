import {
  FC,
  useContext,
} from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { TodoContext } from '../context/TodoContext';
import { TodosList } from './TodosList';

export const TodoApp: FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0 && (
        <>
          <TodosList />
          <Footer />
        </>
      )}
    </div>
  );
};
