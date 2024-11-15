import { useContext } from 'react';

import { TodoHeader } from './TodoHeader/TodoHeader';
import { TodoList } from './TodoList/TodoList';
import { TodoFooter } from './TodoFooter/TodoFooter';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import { TodosContext } from '../../context/TodoContext';
import { useTodoFilter } from '../../hooks/useTodoFilter';

export const Todos = () => {
  const { todos, error } = useContext(TodosContext);
  const { filtredTodos, setTodoStatus, todoStatus } = useTodoFilter(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />

        <TodoList todos={filtredTodos} />

        {!!todos.length && (
          <TodoFooter
            todos={todos}
            setStatus={setTodoStatus}
            status={todoStatus}
          />
        )}
      </div>

      <ErrorNotification error={error} />
    </div>
  );
};
