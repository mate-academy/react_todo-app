import {
  FC, useEffect, useState,
} from 'react';
import {
  addTodo,
  deleteTodo, getTodos, updateTodo, userId,
} from '../../api/api';
import { Todo } from '../../type';
import { TodoFilter } from '../TodoFilter';
import { TodoForm } from '../TodoForm';
import { TodoList } from '../TodoList';

export const TodoApp: FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  async function load() {
    const todoFromServer = await getTodos();

    setVisibleTodos(todoFromServer);
  }

  useEffect(() => {
    load();
  }, []);

  const onDelete = (id: number | undefined) => {
    setVisibleTodos(state => {
      return state.filter(todoForChange => {
        if (id) {
          deleteTodo(id);
        }

        return todoForChange.id !== id;
      });
    });
  };

  const deleteAll = () => {
    setVisibleTodos(prevTodo => {
      return prevTodo.filter(todo => {
        if (todo.completed && todo.id) {
          deleteTodo(todo.id);
        }

        return !todo.completed;
      });
    });
  };

  const completedAllTodos = () => {
    const allTodoDone = visibleTodos.every(todo => todo.completed);

    setVisibleTodos(prevTodo => {
      if (allTodoDone) {
        return prevTodo.map(todo => {
          if (todo.id) {
            updateTodo(todo.id, { completed: false });
          }

          return { ...todo, completed: false };
        });
      }

      return prevTodo.map(todo => {
        if (!todo.completed && todo.id) {
          updateTodo(todo.id, { completed: true });

          return { ...todo, completed: true };
        }

        return todo;
      });
    });
  };

  const onCompletedChange = (id: number | undefined) => {
    setVisibleTodos(state => {
      return state.map(todoForChange => {
        if (todoForChange.id === id) {
          if (todoForChange.id) {
            updateTodo(
              todoForChange.id,
              { completed: !todoForChange.completed },
            );
          }

          return {
            ...todoForChange,
            completed: !todoForChange.completed,
          };
        }

        return todoForChange;
      });
    });
  };

  const addNewTodo = (event: React.FormEvent, targetValue: string) => {
    event.preventDefault();
    const newTodo: Todo = {
      title: targetValue,
      completed: false,
      userId,
    };

    addTodo(newTodo);

    setVisibleTodos(prevTodo => [...prevTodo,
      { id: +new Date(), ...newTodo },
    ]);
  };

  return (
    <div className="todoapp">
      <TodoForm
        addNewTodo={addNewTodo}
        completedAllTodos={completedAllTodos}
        visibleTodos={visibleTodos}
      />
      <TodoList
        todoList={visibleTodos}
        onDelete={onDelete}
        onCompletedChange={onCompletedChange}
        setVisibleTodos={setVisibleTodos}
      />

      {visibleTodos.length !== 0
        && (
          <TodoFilter
            todos={visibleTodos}
            DeleteAll={deleteAll}
          />
        )}
    </div>
  );
};
