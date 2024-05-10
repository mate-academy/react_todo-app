import React, { useEffect, useState } from 'react';
import { Header } from './Components/Header';
import { Todo } from './Types/Todo';
import { TodoList } from './Components/TodoList';
import { Footer } from './Components/Footer';
import { SortingTodos } from './enums/Sortings';

// function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
//   const [value, setValue] = useState<T>(() => {
//     const data = localStorage.getItem(key);
//
//     if (data === null) {
//       return startValue;
//     }
//
//     try {
//       return JSON.parse(data);
//     } catch (e) {
//       return startValue;
//     }
//   });
//
//   const save = (newValue: T) => {
//     localStorage.setItem(key, JSON.stringify(newValue));
//     setValue(newValue);
//   };
//
//   return [value, save];
// }

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState(SortingTodos.all);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addPost = ({ ...data }: { title: string; status: boolean }) => {
    setTodos((currentTodo: Todo[]) => {
      const newTodo = {
        id: +new Date(),
        title: data.title,
        status: data.status,
      };

      return [newTodo, ...currentTodo];
    });
  };

  const updateTodoStatus = (id: number, newStatus: boolean) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, status: newStatus } : todo,
      ),
    );
  };

  const deleteTodoItem = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
  };

  const ActiveTabHandle = (tab: SortingTodos) => {
    setActiveTab(tab);
  };

  const prepareTodos = (tab: SortingTodos): Todo[] => {
    if (tab === SortingTodos.completed) {
      return todos.filter(todo => todo.status === true);
    } else if (tab === SortingTodos.active) {
      return todos.filter(todo => todo.status === false);
    } else {
      return todos;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <Header onSubmit={addPost} />

      <div className="todoapp__content">
        <section className="todoapp__main" data-cy="TodoList">
          <TodoList
            todos={prepareTodos(activeTab)}
            updateTodoStatus={updateTodoStatus}
            onDeleteTodo={deleteTodoItem}
          />
        </section>

        <Footer
          todos={prepareTodos(activeTab)}
          setActiveTab={ActiveTabHandle}
        />
      </div>
    </div>
  );
};
