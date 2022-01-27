import React, { useEffect, useState } from 'react';
import TodoList from './components/TodoList';

function App() {
  const [newTodo, setNewTodo] = useState();
  const [listTodo, setListTodo] = useState(
    JSON.parse(localStorage.getItem('items')) || [],
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(listTodo));
  }, [listTodo]);

  const handleEvent = (event) => {
    event.preventDefault();

    const task = {
      id: (+new Date()),
      title: newTodo,
      completed: false,
      editing: false,
      prevText: '',
    };

    setListTodo([...listTodo, task]);
    setNewTodo('');
  };

  const deleteTodo = (todoId) => {
    const newArr = listTodo.filter(
      todo => todo.id !== todoId,
    );

    setListTodo(newArr);
  };

  const changeComplete = (todoId) => {
    setListTodo(
      listTodo.map((todo) => {
        if (todo.id === todoId) {
          const handle = todo.completed;

          return {
            ...todo,
            completed: !handle,
          };
        }

        return todo;
      }),
    );
  };

  const changeItem = (abc, todoId) => {
    setListTodo(
      listTodo.map((todo) => {
        if (todo.id === todoId) {
          const next = abc;

          return {
            ...todo,
            title: next,
          };
        }

        return todo;
      }),
    );
  };

  const changeEditing = (todoId) => {
    setListTodo(
      listTodo.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            prevText: todo.title,
          };
        }

        return todo;
      }),
    );
  };

  const allComplete = () => {
    if (listTodo.find(todo => todo.completed !== true)) {
      const newArr = listTodo.map(todo => (
        {
          ...todo,
          completed: true,
        }
      ));

      return setListTodo(newArr);
    }

    return setListTodo(
      listTodo.map((todo) => {
        const handle = todo.completed;

        return {
          ...todo,
          completed: !handle,
        };
      }),
    );
  };

  const clearCompleted = () => {
    setListTodo(
      listTodo.filter(
        todo => todo.completed !== true,
      ),
    );
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleEvent}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={event => setNewTodo(event.target.value)}
            required
          />
        </form>
      </header>

      {listTodo.length > 0 && (
        <TodoList
          items={listTodo}
          deleteTodo={deleteTodo}
          changeComplete={changeComplete}
          allComplete={allComplete}
          clearCompleted={clearCompleted}
          changeEditing={changeEditing}
          changeItem={changeItem}
        />
      )}
    </section>
  );
}

export default App;
