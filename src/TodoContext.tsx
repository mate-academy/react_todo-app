/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { FilterField } from './types/FilterField';

function useLocaleStorage<T>(key:string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return startValue;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return startValue;
    }
  });

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, save];
}

const TodoContext = React.createContext({
  todos: [] as Todo[],
  setTodos: (_newTodos: Todo[]) => { },
  title: '',
  setTitle: (_newTitle: string) => { },
  visibleTodos: [] as Todo[],
  setVisibleTodos: (_newVisibleTodos: Todo[]) => { },
  filterField: FilterField.all,
  setFilterField: (_newFilter: FilterField) => {},
  completeAll: () => {},
  toggleTodo: (_toggleId: number) => {},
  deleteTodo: (_deleteId: number) => {},
  clearCompleted: (_event: React.MouseEvent) => {},
  handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => {},
  handleSubmit: (_event: React.FormEvent) => {},
});

type Props = {
  children: React.ReactNode,
};

const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[] | []>('todos', []);
  const [title, setTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [filterField, setFilterField] = useState(FilterField.all);

  const completeAll = () => {
    let state = true;

    if (todos.every(t => t.completed)) {
      state = false;
    }

    const newTodos = todos.map(t => ({
      ...t,
      completed: state,
    }));

    setTodos(newTodos);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newtodo = {
      id: +new Date(),
      title: `${title}`,
      completed: false,
    };

    setTitle('');
    setTodos([...todos, newtodo]);
  };

  const toggleTodo = (toggleId: number) => {
    const newTodos = todos.map(t => ({
      ...t,
      completed: t.id === toggleId
        ? !t.completed
        : t.completed,
    }));

    setTodos(newTodos);
  };

  const deleteTodo = (deleteId: number) => {
    const newTodos = todos.filter(t => t.id !== deleteId);

    setTodos(newTodos);
  };

  const clearCompleted = (event: React.MouseEvent) => {
    event.preventDefault();

    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const todosForRender = useMemo(() => {
    const goodsForRender = todos.filter(todo => {
      switch (filterField) {
        case FilterField.completed:
          return todo.completed;
        case FilterField.active:
          return !todo.completed;
        default:
          return true;
      }
    });

    return filterField !== FilterField.all
      ? goodsForRender
      : todos;
  }, [filterField, visibleTodos, todos]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    title,
    setTitle,
    visibleTodos: todosForRender,
    setVisibleTodos,
    filterField,
    setFilterField,
    completeAll,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    handleChange,
    handleSubmit,
  }), [todos, title, visibleTodos, filterField]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
