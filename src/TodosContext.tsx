import React, { useMemo } from 'react';
import { Todo } from './types/Todo';
import { Context } from './types/Context';
import { Status } from './types/Status';
import { useLocalStorage } from './hooks/useLocalStorage';

export const TodosContext = React.createContext<Context>({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
  toggleCompleted: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  filterTodos: () => [],
  todoCount: 0,
  isCompleted: false,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  function deleteTodo(todoId: number) {
    setTodos(todos.filter((todo: Todo) => todo.id !== todoId));
  }

  function addTodo(todoName: string) {
    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: todoName,
        completed: false,
      },
    ]);
  }

  function editTodo(todoId: number, newTitle: string) {
    setTodos(todos.map((todo: Todo) => (todoId === todo.id
      ? { ...todo, title: newTitle }
      : todo
    )));
  }

  function toggleCompleted(todoId: number) {
    setTodos(todos.map((todo: Todo) => (todoId === todo.id
      ? { ...todo, completed: !todo.completed }
      : todo
    )));
  }

  function filterTodos(filterType: Status) {
    return todos.filter((todo: Todo) => {
      switch (filterType) {
        case Status.ALL:
          return true;

        case Status.ACTIVE:
          return !todo.completed;

        case Status.COMPLETED:
          return todo.completed;

        default:
          return true;
      }
    });
  }

  function clearCompleted() {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
  }

  function toggleAll() {
    const everyTodoCompleted = todos
      .every((todo: Todo) => todo.completed);

    setTodos(todos.map(currentTodo => {
      return {
        ...currentTodo,
        completed: !everyTodoCompleted,
      };
    }));
  }

  const todoCount = todos
    .filter((todo: Todo) => !todo.completed).length;

  const isCompleted = todos.some((todo: Todo) => todo.completed);

  const value = useMemo(() => ({
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    toggleAll,
    filterTodos,
    clearCompleted,
    toggleCompleted,
    todoCount,
    isCompleted,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
