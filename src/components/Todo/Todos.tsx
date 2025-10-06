import { useContext, useEffect, useRef, useState } from 'react';
import { Filter, Todo } from '../../types/todo';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { DispatchContext, StateContext } from '../../context/Store';

export const Todos = () => {
  const [todosFromLocalHost, setTodosFromLocalHost] = useLocalStorage();
  // const [todos, setTodos] = useState<Todo[]>(todosFromLocalHost);
  const dispatch = useContext(DispatchContext);
  const { todos } = useContext(StateContext);

  useEffect(() => {}, []);

  useEffect(() => {
    setTodosFromLocalHost(todos);
  }, [todos]);

  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const filteredTodos = getActivesTodos(activeFilter);
  const completedTodos = getActivesTodos('completed');

  function getActivesTodos(filterType: Filter) {
    if (filterType === 'all') {
      return todos;
    } else if (filterType === 'active') {
      return todos.filter(todo => !todo.completed);
    } else if (filterType === 'completed') {
      return todos.filter(todo => todo.completed);
    }
    return todos;
  }

  function handleActiveFilter(filter: Filter) {
    setActiveFilter(filter);
  }

  // function handleSetTodos(newTodos: Todo) {
  //   setTodos(todos => [...todos, newTodos]);
  // }

  // function handleSetTodos(newTodos: Todo) {
  //   dispatch({ type: 'add', payload: newTodos });
  // }

  // function handleUpdateTodo(updatedTodo: Todo) {
  //   if (updatedTodo.title.trim() === '') {
  //     handleDeleteTodo(updatedTodo.id);

  //     return;
  //   }

  //   setTodos(prevTodos => {
  //     return prevTodos.map(todo =>
  //       todo.id === updatedTodo.id
  //         ? { ...todo, title: updatedTodo.title }
  //         : todo,
  //     );
  //   });
  // }

  // function handleClearCompleted() {
  //   setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  // }

  // function handleDeleteTodo(id: number) {
  //   setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  // }

  // function handleToggleCompleted(id: number) {
  //   setTodos(prevTodos => {
  //     return prevTodos.map(todo => {
  //       return todo.id === id ? { ...todo, completed: !todo.completed } : todo;
  //     });
  //   });
  // }

  // function handleToggleALL() {
  //   setTodos(prevTodos => {
  //     if (prevTodos.find(todo => !todo.completed)) {
  //       return prevTodos.map(todo => ({ ...todo, completed: true }));
  //     } else {
  //       return prevTodos.map(todo => ({ ...todo, completed: false }));
  //     }
  //   });
  // }

  const mainRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="todoapp__content">
      <Header mainRef={mainRef} />
      <Main mainRef={mainRef} />
      {/* Hide the footer if there are no todos */}
      {todos.length > 0 && (
        <Footer
          handleActiveFilter={handleActiveFilter}
          activeFilter={activeFilter}
          counter={todos.length}
          handleClearCompleted={handleClearCompleted}
          completedTodos={completedTodos}
        />
      )}
    </div>
  );
};
