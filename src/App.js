import React from 'react';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: (() => {
      if (localStorage.todos !== undefined) {
        return [...JSON.parse(localStorage.todos)];
      }

      return [];
    })(),

    currentFilter: 'all',
    filterTypes: {
      all: 'all',
      completed: 'completed',
      active: 'active',
    },
    editValue: '',
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  editChangeHandler = ({ target }) => {
    this.setState({
      editValue: target.value,
    });
  }

  setEditedValue = (event, id, value) => {
    if (!event.target.value || event.target.value.trim() === '') {
      this.deleteTodo(id);
    }

    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          title: value || todo.title,
          editable: false,
        };
      }),
      editValue: '',
    }));
  }

  editTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== id) {
          return {
            ...todo,
            editable: false,
          };
        }

        return {
          ...todo,
          editable: true,
        };
      }),
    }));
  };

  handleKeyPress = (event, id, value) => {
    if (event.key === 'Escape') {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          editable: false,
        })),
      }));
    } else if (event.key === 'Enter') {
      this.setEditedValue(event, id, value);
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  selectAllTodos = () => {
    this.setState((prevState) => {
      const allSelected = prevState.todos.every(todo => todo.completed);

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: !allSelected,
        })),
      };
    });
  }

  toggleTodoCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  clearCompletedHandler = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  getFilteredTodos = (currentFilter) => {
    const { todos, filterTypes } = this.state;

    switch (currentFilter) {
      case filterTypes.completed: return todos.filter(todo => todo.completed);
      case filterTypes.active: return todos.filter(todo => !todo.completed);
      case filterTypes.all: return todos;
      default: return todos;
    }
  }

  setCurrentFilter = (filter) => {
    const { filterTypes } = this.state;

    this.setState({
      currentFilter: filterTypes[filter],
    });
  }

  render() {
    const {
      todos,
      currentFilter,
      filterTypes,
      editValue,
    } = this.state;
    const visibleTodos = this.getFilteredTodos(currentFilter);

    return (
      <section className="todoapp">
        <NewTodo
          addTodo={this.addTodo}
        />
        <TodoList
          todos={todos}
          editValue={editValue}
          visibleTodos={visibleTodos}
          selectAllTodos={this.selectAllTodos}
          deleteTodo={this.deleteTodo}
          toggleTodoCompleted={this.toggleTodoCompleted}
          handleKeyPress={this.handleKeyPress}
          editTodo={this.editTodo}
          setEditedValue={this.setEditedValue}
          editChangeHandler={this.editChangeHandler}
        />
        <Footer
          todos={todos}
          clearCompletedHandler={this.clearCompletedHandler}
          setCurrentFilter={this.setCurrentFilter}
          filterTypes={filterTypes}
          currentFilter={currentFilter}
        />
      </section>
    );
  }
}

export default App;
