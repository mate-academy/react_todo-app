import React from 'react';
import { Context } from './types/Context';
import { useLocalStorage } from './useLocalStorage';
import { Todo } from './types/Todo';
import { Status } from './types/Status';

export const TodosContext = React.createContext<Context>({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  deleteTodo: () => {},
  toggleAll: () => {},
  toggleCompleted: () => {},
  filterTodos: () => [],
  clearCompleted: () => {},
  todoCount: 0,
  isCompleted: false,
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  function deleteTodo(todoId: number) {
    setTodos(todos.filter((todo) => todoId !== todo.id));
  }

  function addTodo(todoTitle: string) {
    setTodos([
      ...todos,
      {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      },
    ]);
  }

  function editTodo(todoId: number, newTitle: string) {
    setTodos(todos.map(todo => (todoId === todo.id
      ? { ...todo, title: newTitle }
      : todo
    )));
  }

  function toggleCompleted(todoId: number) {
    setTodos(todos.map(todo => (todoId === todo.id
      ? { ...todo, completed: !todo.completed }
      : todo
    )));
  }

  function filterTodos(filterType: Status) {
    return todos.filter(todo => {
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
    setTodos(todos.filter(todo => !todo.completed));
  }

  function toggleAll() {
    const everyTodoCompleted = todos.every(todo => todo.completed);

    setTodos(todos.map(currentTodo => {
      return {
        ...currentTodo,
        completed: !everyTodoCompleted,
      };
    }));
  }

  const todoCount = todos.filter(todo => !todo.completed).length;

  const isCompleted = todos.some(todo => todo.completed);

  return (
    <TodosContext.Provider value={{
      todos,
      addTodo,
      editTodo,
      deleteTodo,
      toggleAll,
      toggleCompleted,
      filterTodos,
      clearCompleted,
      todoCount,
      isCompleted,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
