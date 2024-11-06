import { useContext } from 'react';
import { Todo } from '../types/todo';
import { TodosContext } from './TodosContext&Provider';

export const useTodo = () => {
  const { todos, setTodos } = useContext(TodosContext);

  const addTodo = (title: Todo['title']) => {
    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: Todo['id']) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleTodo = (id: Todo['id']) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(t => t.completed);

    setTodos(currTodos =>
      currTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const renameTodo = (id: Todo['id'], newTitle: string) => {
    setTodos(currTodos =>
      currTodos.map(todo =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    );
  };

  return {
    todos,
    addTodo,
    removeTodo,
    clearCompleted,
    toggleTodo,
    toggleAll,
    renameTodo,
  };
};
