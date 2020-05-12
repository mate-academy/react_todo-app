import React from 'react';
import uuid from 'react-uuid';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { Footer } from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    checkedAll: false,
    filterSelected: 'all',
  }

  componentDidMount() {
    if (localStorage.getItem('todos') !== null) {
      const todoItems = JSON.parse(localStorage.getItem('todos'));

      this.setState(todoItems);
    }
  }

  componentDidUpdate() {
    const { todos } = this.state;

    localStorage.setItem('todos', JSON.stringify({ todos }));
  }

  checkAll = ({ target }) => {
    this.setState(({ todos, checkedAll }) => {
      const newTodos = todos.map(todo => ({
        ...todo,
        done: target.checked,
      }));

      return {
        todos: newTodos,
        checkedAll: !checkedAll,
      };
    });
  }

  addItem = (text) => {
    if (text.trim() === '') {
      return;
    }

    this.setState(({ todos }) => {
      const newItem = {
        id: uuid(),
        done: false,
        text,
      };

      return {
        todos: [...todos, newItem],
        checkedAll: false,
      };
    });
  }

  clickHandler = (event) => {
    const filterSelected = event.target.name;

    this.setState({
      filterSelected,
    });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.done),
      checkedAll: false,
    }));
  };

  handleDelete = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(currentTodo => currentTodo.id !== id),
    }));
  };

  toggleItem = (id) => {
    this.setState(({ todos }) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }

        return todo;
      });

      const checkedAll = newTodos.every(todo => todo.done === true);

      return {
        todos: newTodos,
        checkedAll,
      };
    });
  }

  changeText = (id, text) => {
    this.setState(({ todos }) => {
      const newItems = todos.map((todo) => {
        if (todo.id === id && text !== '') {
          return {
            ...todo,
            text,
          };
        }

        if (todo.id === id && text === '') {
          this.setState(() => ({
            todos: todos.filter(currentTodo => currentTodo.id !== id),
          }));
        }

        return todo;
      });

      return {
        todos: newItems,
      };
    });
  };

  todosFilter = (todos, filterSelected) => {
    switch (filterSelected) {
      case 'completed':
        return todos.filter(todo => todo.done);
      case 'active':
        return todos.filter(todo => !todo.done);
      default:
        return todos;
    }
  };

  render() {
    const {
      todos,
      checkedAll,
      filterSelected,
    } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTodo addItem={this.addItem} />
        <section className="main">
          {todos.length
            ? (
              <>
                <input
                  type="checkbox"
                  id="toggle-all"
                  checked={checkedAll}
                  className="toggle-all"
                  onChange={this.checkAll}
                />
                <label htmlFor="toggle-all">
                  Mark all as complete
                </label>
              </>
            )
            : null}
          <TodoList
            todos={this.todosFilter(todos, filterSelected)}
            onDelete={this.handleDelete}
            toggleItem={this.toggleItem}
            onTextChanged={this.changeText}
          />
        </section>

        {todos.length
          ? (
            <Footer
              todos={todos}
              clickHandler={this.clickHandler}
              clearCompleted={this.clearCompleted}
              filterSelected={filterSelected}
            />

          ) : null}
      </section>
    );
  }
}

export default App;
