import React, { createContext, useEffect, useReducer, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { TodoApp } from './Components/TodoApp';
import { Todo } from './types/TodoType';
import { Action } from './types/ActionType';
// eslint-disable-next-line import/no-cycle
import { TodoList } from './Components/TodoList';
// eslint-disable-next-line import/no-cycle
import { TodosFilter } from './Components/TodosFilter';
import { TodoDispatch } from './types/DispatchType';

export const TodosContext = createContext<{
  todos: Todo[];
  dispatch: TodoDispatch;
}>({ todos: [], dispatch: () => null });

const newTodo = (name: string): Todo => ({
  id: new Date(),
  name,
  completed: false,
});

function reducer(filteredTodos: Todo[], action: Action) {
  switch (action.type) {
    case 'add-todo':
      return [...filteredTodos, newTodo(action.payload.name)];
    case 'delete-todo':
      return filteredTodos.filter(todo => todo.id !== action.payload.id);
    case 'edit-todo':
      return filteredTodos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, name: action.payload.name }
          : todo,
      );
    case 'toggle-todo':
      return filteredTodos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'toggle-all-todo':
      return filteredTodos.map(todo => ({
        ...todo,
        completed: action.payload.completed,
      }));

    case 'clear-completed':
      return filteredTodos.filter(todo => !todo.completed);
    default:
      return filteredTodos;
  }
}

export const App: React.FC = () => {
  const [name, setName] = useState('');
  const [todos, dispatch] = useReducer(reducer, []);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  return (
    <TodosContext.Provider value={{ dispatch, todos }}>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp name={name} setName={setName} />
        </header>
        <TodoList todos={filteredTodos} />
        {todos.length !== 0 && (
          <TodosFilter handleFiltering={setFilteredTodos} />
        )}
      </div>
    </TodosContext.Provider>
  );
};
