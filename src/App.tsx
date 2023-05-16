import React, { useEffect, useState, useMemo } from 'react';
import { UserLogIn } from './UserLogIn';
import { Header } from './components/Header';
import { Todos } from './components/Todos';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';

import {
  getTodos, postTodos, deleteTodo, patchTodos,
} from './api/todos';

import { Todo } from './types/Todo';
import { FilteredBy } from './types/FilteredBy';
import { Errors } from './types/Errors';

export const App: React.FC = () => {
  const [USER_ID, setUserId] = useState<number | null>(null);
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteredBy, setFilteredBy] = useState<FilteredBy>(FilteredBy.All);
  const [typeOfError, setTypeOfError] = useState<Errors>(Errors.None);
  const [isTodoAdded, setTodoAdded] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [updatingTitle, setUpdatingTitle] = useState('');
  const [targetTodosIds, setTargetTodosIds] = useState<number[]>([]);
  const activeTodo = todos?.filter(todo => !todo.completed) || [];
  const isActive = activeTodo?.length > 0;

  const setNewUserId = (id: number | null) => {
    setUserId(id);
  };

  async function getTodoList() {
    try {
      const todoList = await getTodos(USER_ID);

      setTodos(todoList);
    } catch (error) {
      setTypeOfError(Errors.Loading);
    }
  }

  const postNewTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo = {
      id: 0,
      title: newTodoTitle,
      userId: USER_ID,
      completed: false,
    };

    if (newTodoTitle !== '') {
      setTodoAdded(true);
      try {
        const todo = await postTodos(USER_ID, newTodo);

        setTodos((currTodo) => {
          if (currTodo) {
            return [...currTodo, todo];
          }

          return [todo];
        });

        setNewTodoTitle('');
      } catch (error) {
        setTypeOfError(Errors.Adding);
      } finally {
        setTodoAdded(false);
      }
    } else {
      setTypeOfError(Errors.Title);
    }
  };

  const removeTodo = async (targetId: number) => {
    const deletedTodo = todos?.find(todo => todo.id === targetId);

    try {
      setTargetTodosIds(currIds => {
        return [...currIds, deletedTodo?.id || 0];
      });
      await deleteTodo(deletedTodo?.id || 0);
      setTodos(todos?.filter(todo => todo.id !== +targetId) || null);
    } catch (error) {
      setTypeOfError(Errors.Deleting);
    } finally {
      setTargetTodosIds((currIds: number[]) => {
        return currIds.filter((id: number) => id !== targetId);
      });
    }
  };

  const clearCompleted = async () => {
    const todosForDeleting: Promise<unknown>[] = [];
    const completedTodoIds: number[] = [];

    todos?.forEach(todo => {
      if (todo.completed) {
        todosForDeleting.push(deleteTodo(todo.id));
        completedTodoIds.push(todo.id);
      }
    });

    try {
      setTargetTodosIds(currIds => [...currIds, ...completedTodoIds]);
      await Promise.all(todosForDeleting);

      setTodos(todos?.filter(todo => !todo.completed) || null);
    } catch (error) {
      setTypeOfError(Errors.Deleting);
    } finally {
      setTargetTodosIds([]);
    }
  };

  const visibleTodos = useMemo(() => {
    if (!todos) {
      return null;
    }

    switch (filteredBy) {
      case FilteredBy.All:
        return todos;

      case FilteredBy.Completed:
        return todos.filter(todo => todo.completed);

      case FilteredBy.Active:
        return todos.filter(todo => !todo.completed);

      default:
        return null;
    }
  }, [filteredBy, todos]);

  const setFilter = (value: FilteredBy) => {
    setFilteredBy(value);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.currentTarget.value);
  };

  const changeTodoStatus = async (todoId: number, completed: boolean) => {
    setTargetTodosIds(currIds => {
      return [...currIds, todoId || 0];
    });

    try {
      await patchTodos(todoId, { completed });

      setTodos((currTodo) => {
        if (currTodo) {
          return currTodo.map(todo => {
            if (todo.id === todoId) {
              return { ...todo, completed };
            }

            return todo;
          });
        }

        return null;
      });
    } catch (error) {
      setTypeOfError(Errors.Updating);
    } finally {
      setTargetTodosIds([]);
    }
  };

  const toggleAll = async () => {
    const todosForUpdaiting: Promise<unknown>[] = [];
    const targetTodoIds: number[] = [];

    if (isActive) {
      todos?.forEach(todo => {
        if (!todo.completed) {
          todosForUpdaiting.push(patchTodos(todo.id, { completed: true }));
          targetTodoIds.push(todo.id);
        }
      });
    } else {
      todos?.forEach(todo => {
        todosForUpdaiting.push(patchTodos(todo.id, { completed: false }));
        targetTodoIds.push(todo.id);
      });
    }

    try {
      setTargetTodosIds(currIds => [...currIds, ...targetTodoIds]);
      await Promise.all(todosForUpdaiting);

      if (isActive) {
        setTodos(todos?.map(todo => {
          if (!todo.completed) {
            return { ...todo, completed: true };
          }

          return todo;
        }) || null);
      } else {
        setTodos(todos?.map(todo => ({ ...todo, completed: false })) || null);
      }
    } catch (error) {
      setTypeOfError(Errors.Updating);
    } finally {
      setTargetTodosIds([]);
    }
  };

  const enterEditMode = (title: string) => {
    setUpdatingTitle(title);
  };

  const submitTitleUpdating = async (todoId: number, oldTitle: string) => {
    if (oldTitle === updatingTitle) {
      return;
    }

    setTargetTodosIds(currIds => {
      return [...currIds, todoId || 0];
    });
    if (updatingTitle !== '') {
      try {
        await patchTodos(todoId, { title: updatingTitle });
        setTodos((currTodo) => {
          if (currTodo) {
            return currTodo.map(todo => {
              if (todo.id === todoId) {
                return { ...todo, title: updatingTitle };
              }

              return todo;
            });
          }

          return null;
        });
      } catch (error) {
        setTypeOfError(Errors.Updating);
      } finally {
        setTargetTodosIds([]);
      }
    } else {
      removeTodo(todoId);
    }
  };

  const removeNotification = () => {
    setTypeOfError(Errors.None);
  };

  useEffect(() => {
    if (USER_ID) {
      getTodoList();
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTypeOfError(Errors.None);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [typeOfError]);

  if (!USER_ID) {
    return (
      <UserLogIn
        setNewUserId={setNewUserId}
        typeOfError={typeOfError}
        setTypeOfError={setTypeOfError}
        removeNotification={removeNotification}
      />
    );
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoTitle={newTodoTitle}
          handleInput={handleInput}
          postNewTodo={postNewTodo}
          isTodoAdded={isTodoAdded}
          isActiveTodo={isActive || false}
          toggleAll={toggleAll}
        />

        {!!todos?.length && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              <Todos
                todos={visibleTodos}
                newTodoTitle={newTodoTitle}
                isTodoAdded={isTodoAdded}
                removeTodo={removeTodo}
                targetTodosIds={targetTodosIds}
                changeTodoStatus={changeTodoStatus}
                enterEditMode={enterEditMode}
                updatingTitle={updatingTitle}
                setUpdatingTitle={setUpdatingTitle}
                submitTitleUpdating={submitTitleUpdating}
              />
            </section>

            <Footer
              setFilter={setFilter}
              filteredBy={filteredBy}
              activeTodoAmount={activeTodo?.length}
              isCompletedPresent={todos.some(todo => todo.completed)}
              clearCompleted={clearCompleted}
            />
          </>
        )}
      </div>

      <Notification
        typeOfError={typeOfError}
        removeNotification={removeNotification}
      />
    </div>
  );
};
