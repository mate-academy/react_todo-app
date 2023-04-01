import { createContext, useContext, useState } from 'react';
import { Todo } from '../types/Todo/Todo';

import { useLocalStorage } from '../hooks/LocalStorage';

interface ITodoContext {
  todosOriginal: Todo[] | undefined,
  setTodosOriginal: (value: Todo[] | undefined) => void,
  todos: Todo[] | undefined,
  setTodos: (value: Todo[] | undefined) => void,
  checkCompleted: (element: Todo) => void,
  deleteTodo: (element: Todo) => void,
  changeTitle: (todoId: number, titleText: string) => void,

  statusTodo: string,
  setStatus: (value: string) => void,
  statusTodosHandler: (value: string) => void,
  all: boolean,
  setAll: (value: boolean) => void,
  active: boolean,
  setActive: (value: boolean) => void,
  completedTodo: boolean,
  setCompletedTodo: (value: boolean) => void,
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const TodoContext = createContext<ITodoContext>(null!);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todosOriginal, setTodosOriginal]
    = useLocalStorage('todosOriginal');
  const [todos, setTodos] = useLocalStorage('todos');

  const [statusTodo, setStatus] = useState('All');
  const [all, setAll] = useState(true);
  const [active, setActive] = useState(false);
  const [completedTodo, setCompletedTodo] = useState(false);

  const checkCompleted = (element: Todo) => {
    const newTodos: Todo[] | undefined = [];

    todosOriginal?.forEach((el: Todo) => {
      const { id, title, completed } = el;

      if (id === element.id) {
        newTodos.push({ id, title, completed: !completed });
      } else {
        newTodos.push({ id, title, completed });
      }
    });

    setTodosOriginal(newTodos);
    setTodos(newTodos);
  };

  const deleteTodo = (element: Todo) => {
    if (todosOriginal?.length === 1) {
      setTodosOriginal(undefined);
      setTodos(undefined);
    } else {
      const newTodos: Todo[] = [];

      todosOriginal?.forEach((elem: Todo) => {
        if (elem.title !== element.title) {
          newTodos.push(elem);
        }
      });

      setTodosOriginal(newTodos);
      setTodos(newTodos);
    }
  };

  const changeTitle = (todoId: number, titleText: string) => {
    const changeTodo: Todo[] | undefined = [];

    todosOriginal?.forEach((tod: Todo) => {
      const { id, title, completed } = tod;

      if (id === todoId) {
        if (titleText.length) {
          changeTodo.push({ id, title: titleText, completed });
        }
      } else if (id !== todoId) {
        changeTodo.push({ id, title, completed });
      }
    });

    setTodosOriginal(changeTodo);
    setTodos(changeTodo);
  };

  const statusTodosHandler = (value: string) => {
    let newTodos: Todo[] | undefined = [];

    switch (value) {
      case 'Active':
        newTodos = todosOriginal?.filter((ele: Todo) => !ele.completed);
        setAll(false);
        setActive(true);
        setCompletedTodo(false);
        setTodos(newTodos);

        return;
      case 'Completed':
        newTodos = todosOriginal?.filter((ele: Todo) => ele.completed);
        setAll(false);
        setActive(false);
        setCompletedTodo(true);
        setTodos(newTodos);

        return;
      default:
        setAll(true);
        setActive(false);
        setCompletedTodo(false);
        setTodos(todosOriginal);
    }
  };

  const value = {
    todosOriginal,
    setTodosOriginal,
    todos,
    setTodos,
    checkCompleted,
    deleteTodo,
    changeTitle,

    statusTodo,
    setStatus,
    statusTodosHandler,
    all,
    setAll,
    active,
    setActive,
    completedTodo,
    setCompletedTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
