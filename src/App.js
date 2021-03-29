import React, { useEffect, useState } from 'react';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { ToggleAll } from './components/ToggleAll/ToggleAll';
import { useLocalStorage } from './components/useLocalStorege/useLocalStorage';

function App() {
  const [storageTodos, setStorageTodos] = useLocalStorage('todos', []);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(storageTodos);
  }, [storageTodos]);

  const addTodo = (todo) => {
    setStorageTodos([...storageTodos, todo]);
  };

  const onDelete = (id) => {
    setStorageTodos(storageTodos.filter(todo => todo.id !== id));
  };

  const todosCompletedLength = storageTodos.filter(
    todo => !todo.completed,
  ).length;

  const onToggleTodos = (isCompleted) => {
    setStorageTodos(storageTodos.map(todo => ({
      ...todo,
      completed: isCompleted,
    })));
  };

  const clearCompleted = () => {
    setStorageTodos(setStorageTodos.filter(todo => !todo.completed));
  };

  const onSwitchTodos = (currentTodo) => {
    const checkedTodos = storageTodos.map(
      todo => ((todo.id === currentTodo.id) ? currentTodo : todo),
    );

    setStorageTodos(checkedTodos);
  };

  const filteredTodos = (fielerType) => {
    let filteredTodo;

    switch (fielerType) {
      case 'active':
        filteredTodo = storageTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodo = storageTodos.filter(todo => todo.completed);
        break;
      default:
        filteredTodo = [...storageTodos];
    }

    setTodos(filteredTodo);
  };

  const onEditTodo = (editTodo) => {
    setStorageTodos(storageTodos.map((todo) => {
      if (todo.id !== editTodo.id) {
        return todo;
      }

      return {
        ...todo,
        ...editTodo,
      };
    }));
  };

  return (
    <section className="todoapp">
      <Header onAddTodo={addTodo} />
      <section className="main">
        {storageTodos.length > 0 && (
        <ToggleAll
          checkCompeted={todosCompletedLength}
          onToggleTodos={onToggleTodos}
        />
        )}
        <TodoList
          todos={todos}
          onSwitchTodos={onSwitchTodos}
          onDelete={onDelete}
          onEditTodo={onEditTodo}
        />
      </section>
      {storageTodos.length > 0
      && (
        <footer className="footer">
          <TodosFilter
            checkCompeted={todosCompletedLength}
            filteredTodos={filteredTodos}
            clearCompleted={clearCompleted}
          />
        </footer>
      )
      }
    </section>

  );
}

export default App;
