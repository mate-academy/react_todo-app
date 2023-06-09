/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TodoForm } from './components/TodoForm';
import { ProgressBar } from './components/ProgressBar';
import { TodoActions } from './components/TodoActions';
import { TodoList } from './components/TodoList';
import { Modal } from './components/Modal';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { useLocalStorageTodos } from './hooks/useLocalStorageTodos';
import styles from './App.module.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorageTodos();
  const [visibleTodos, setVisibleTodos] = useState<Todo[] | []>([]);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAddTodo = (text: string) => {
    setFilter(Filter.All);

    const newTodo = {
      text,
      id: crypto.randomUUID(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setFilter(Filter.All);

    setTodos(todos.map(todo => (
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : { ...todo }
    )));
  };

  const handleDeleteTodo = (id: string) => {
    setFilter(Filter.All);

    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleClearCompletedTodo = () => {
    setFilter(Filter.All);

    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleToggleAllTodos = () => {
    const hasIncompleteTodo = todos.some(todo => !todo.completed);

    setTodos(todos.map(todo => {
      return todo.completed === hasIncompleteTodo
        ? todo
        : { ...todo, completed: hasIncompleteTodo };
    }));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return todos;
    }
  };

  const sortedTodos = () => {
    const copyTodos = [...todos];

    switch (filter) {
      case Filter.Completed:
        copyTodos.sort((a, b) => +b.completed - +a.completed);
        break;

      case Filter.Active:
        copyTodos.sort((a, b) => +a.completed - +b.completed);
        break;

      default:
        break;
    }

    setVisibleTodos(copyTodos);
  };

  useEffect(() => {
    sortedTodos();
    const filteredTodos = getFilteredTodos();

    const allCompleted = todos.every(todo => todo.completed === true);
    const allActive = todos.every(todo => todo.completed === false);

    const delay = allActive || allCompleted ? 0 : 400;

    const timeout = setTimeout(() => {
      setVisibleTodos(filteredTodos);
    }, delay);

    return () => clearTimeout(timeout);
  }, [filter, todos]);

  return (
    <div className={styles.todoapp}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Todos</h1>

          <TodoForm
            handleAddTodo={handleAddTodo}
          />

          <AnimatePresence initial={false}>
            {todos.length && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.actionContainer}
              >
                <ProgressBar todos={todos} setIsOpenModal={setIsOpenModal} />

                <TodoActions
                  filter={filter}
                  setFilter={setFilter}
                  handleClearCompletedTodo={handleClearCompletedTodo}
                  handleToggleAllTodos={handleToggleAllTodos}
                />

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          setFilter={setFilter}
          setTodos={setTodos}
          setVisibleTodos={setVisibleTodos}
          handleToggleTodo={handleToggleTodo}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>

      <Modal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};
