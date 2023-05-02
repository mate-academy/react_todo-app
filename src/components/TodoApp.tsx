import React from 'react';
import { useLocalStorage } from '../helpers';
import { TodosFilter } from './TodosFilter';
import { Header } from './Header';
import { Todolist } from './Todolist';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);

  return (
    <div className="todoapp">
      <Header
        todos={todos}
        setTodos={setTodos}
      />

      {todos.length > 0 && (
        <>
          <Todolist
            todos={todos}
            setTodos={setTodos}
          />

          <TodosFilter todos={todos} setTodos={setTodos} />
        </>
      )}
    </div>
  );
};
