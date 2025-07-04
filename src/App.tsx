import { TodoList } from './components/TodoList';
import { FormTodo } from './components/FormTodo';
import { FooterTodos } from './components/FooterTodos';
import { ErrorTodos } from './components/ErrorTodos';
import { useContext } from 'react';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  const { todos } = useContext(TodoContext);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <FormTodo />

        {todos.length > 0 && <TodoList />}

        {todos.length > 0 && <FooterTodos />}
      </div>

      <ErrorTodos />
    </div>
  );
};
