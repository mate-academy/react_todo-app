import React, {
  useCallback, useState, useMemo,
} from 'react';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { SelectOptions } from './types/SelectOptions';
import { filterTodosBySelectOptions } from './utils/filterTodos';
import { useLocalStorage } from './hooks/useLokalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [completedTodosId, setCompletedTodosId] = useState<number[]>([]);

  const [selectedOption, setSelectedOption]
    = useState<SelectOptions>(SelectOptions.ALL);

  const getCompletedTodosId = useCallback((allTodos: Todo[]) => () => {
    return allTodos
      .filter((todo: Todo) => todo.completed)
      .map(todoItem => todoItem.id);
  }, []);

  const setOptionSelect = (type: SelectOptions) => {
    setSelectedOption(type);
  };

  const visibleTodos = useMemo(() => {
    if (Array.isArray(todos)) {
      return filterTodosBySelectOptions(todos, selectedOption);
    }

    return [];
  }, [todos, selectedOption]);

  const addTodo = (todoToPost: Todo) => {
    setTodos([...todos, todoToPost]);
  };

  const addComplitedTodo = (todoId:number) => {
    const currentTodo = todos.find((todo:Todo) => todo.id === todoId);

    if (currentTodo) {
      if (!completedTodosId.includes(todoId)) {
        setCompletedTodosId(prevState => ([...prevState, todoId]));
      } else {
        setCompletedTodosId(prevState => {
          return prevState.filter(id => id !== todoId);
        });
      }
    }
  };

  const patchTodoStatus = async (todoId: number) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (currentTodo) {
      const newStatus = !currentTodo.completed;

      currentTodo.completed = newStatus;
      setTodos(todos.map(todo => (
        todo.id === todoId
          ? currentTodo
          : todo
      )));
    }
  };

  const updateTodoStatus = (todoId: number) => {
    patchTodoStatus(todoId);
  };

  const deleteTodo = (todoId: number) => {
    const todoToDelete = todos.find(todo => todo.id === todoId);

    if (todoToDelete) {
      setTodos(todos.filter((todo:Todo) => todo.id !== todoId));
    }
  };

  const deleteCompletedTodos = () => {
    const incomplitedTodos: Todo[] = todos.filter(
      (todo: Todo) => !todo.completed,
    );

    setTodos(incomplitedTodos);
  };

  const isToggleAllActive = completedTodosId.length < 1
    || completedTodosId.length === todos.length;

  const onActiveToggle = () => {
    if (isToggleAllActive) {
      todos.map(todo => patchTodoStatus(todo.id));
    }
  };

  const updateTodoTitle = (
    todoId: number, newTitle: string,
  ) => {
    const currentTodo = todos.find(todo => todo.id === todoId);

    if (currentTodo) {
      currentTodo.title = newTitle;
      setTodos(todos.map(todo => (
        todo.id === todoId
          ? currentTodo
          : todo
      )));
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onAddTodo={addTodo}
          isToggleAllActive={isToggleAllActive}
          handleToggleClick={onActiveToggle}
        />

        {!!todos.length
          && (
            <Main
              todos={visibleTodos}
              addComplitedTodo={addComplitedTodo}
              onTodoChangingStatus={updateTodoStatus}
              onTodoDelete={deleteTodo}
              onTodoChangingTitle={updateTodoTitle}
            />
          )}

        {!!todos.length
          && (
            <Footer
              filterTodos={setOptionSelect}
              todosCount={todos.length}
              completedTodosCount={completedTodosId.length}
              deleteCompletedTodos={deleteCompletedTodos}
            />
          )}
      </div>
    </div>
  );
};
