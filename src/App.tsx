import React, { useCallback, useEffect, useState } from 'react';
import { Header } from './Components/Header';
import { Todo } from './Types/Todo';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { SortingTodos } from './enums/Sortings';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState(SortingTodos.all);
  const [toggleAllChecked, setToggleAllChecked] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // handle toggle all
  useEffect(() => {
    const allCompleted =
      todos.length > 0 && todos.every(todo => todo.status === true);

    setToggleAllChecked(allCompleted);
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addPost = useCallback(
    ({ ...data }: { title: string; status: boolean }) => {
      setTodos((currentTodo: Todo[]) => {
        const newTodo = {
          id: +new Date(),
          title: data.title,
          status: data.status,
        };

        return [newTodo, ...currentTodo];
      });
    },
    [],
  );

  const updateTodoStatus = useCallback((id: number, newStatus: boolean) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  }, []);

  const updateTodoTitle = useCallback((updatedTodo: Todo) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  }, []);

  const deleteTodoItem = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const ActiveTabHandle = (tab: SortingTodos) => {
    setActiveTab(tab);
  };

  const prepareTodos = (): Todo[] => {
    if (activeTab === SortingTodos.completed) {
      return todos.filter(todo => todo.status === true);
    } else if (activeTab === SortingTodos.active) {
      return todos.filter(todo => todo.status === false);
    } else {
      return todos;
    }
  };

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      status: !toggleAllChecked,
    }));

    setTodos(updatedTodos);
    setToggleAllChecked(!toggleAllChecked);
  };

  const handleClearCompleted = () => {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.status !== true);
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onSubmit={addPost} onClickToggle={handleToggleAll} />
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={prepareTodos()}
            updateTodoStatus={updateTodoStatus}
            onDeleteTodo={deleteTodoItem}
            updateTodoTitle={updateTodoTitle}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            todos={prepareTodos()}
            setActiveTab={ActiveTabHandle}
            onClearAllTodos={handleClearCompleted}
          />
        )}
      </div>
    </div>
  );
};
