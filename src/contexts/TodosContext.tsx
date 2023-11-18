import React, { createContext, useReducer } from 'react';
import { Todo } from '../types/todo';

type Action = { type: 'add', todo: Todo }
| { type: 'delete', todoId: number }
| { type: 'complete', todoId: number }
| { type: 'edit', todoId: number, newTitle: string }
| { type: 'completeAll' }
| { type: 'clearAllCompleted' };

function handleComplete(list: Todo [], action: Action) {
  let temp;
  const copy = [...list];

  if (action.type === 'complete') {
    temp = list.find(todo => todo.id === action.todoId);
  }

  if (temp) {
    const index = list.indexOf(temp);

    copy[index].completed = !copy[index].completed;
  }

  return copy;
}

function handleEdit(list: Todo [], action: Action) {
  let temp;
  const copy = [...list];

  if (action.type === 'edit') {
    temp = list.find(todo => todo.id === action.todoId);

    if (temp) {
      const index = list.indexOf(temp);

      copy[index].title = action.newTitle;
    }
  }

  return copy;
}

function handleCompleteAll(list: Todo []) {
  let updatedTodos = [];

  if (list.some(todo => !todo.completed)) {
    updatedTodos = list.map((todo) => ({
      ...todo,
      completed: true,
    }));
  } else {
    updatedTodos = list.map((todo) => ({
      ...todo,
      completed: false,
    }));
  }

  return updatedTodos;
}

function reducer(list: Todo [], action: Action): Todo [] {
  let result;

  switch (action.type) {
    case 'add':
      result = [...list, action.todo];
      break;
    case 'delete':
      result = list.filter(todo => todo.id !== action.todoId);
      break;
    case 'complete':
      result = handleComplete(list, action);
      break;
    case 'completeAll':
      result = handleCompleteAll(list);
      break;
    case 'edit':
      result = action.newTitle
        ? handleEdit(list, action)
        : list.filter(todo => todo.id !== action.todoId);
      break;
    case 'clearAllCompleted':
      result = list.filter(todo => !todo.completed);
      break;
    default:
      return list;
  }

  localStorage.setItem('todos', JSON.stringify(result));

  return result;
}

export const TodosContext = createContext<{
  list: Todo[];
  dispatch: React.Dispatch<Action>;
}>({
  list: [],
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [list, dispatch] = useReducer(reducer,
    JSON.parse(localStorage.getItem('todos') || '{}'));

  return (
    <TodosContext.Provider value={{ list, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
