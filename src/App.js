import React from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';
import { Footer } from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    todosToShow: 'all',
  }

  componentDidMount() {
    const cacheTodos = JSON.parse(localStorage.getItem('todos'));

    if (cacheTodos) {
      this.setState({ todos: cacheTodos });
    }
  }

  componentDidUpdate(prevState) {
    const { todos } = this.state;

    if (prevState.todos !== todos) {
      this.saveToLocalStorage();
    }
  }

  updateTodosList = (newTodoTitle) => {
    this.setState((state) => {
      const newTodo = {
        title: newTodoTitle,
        id: state.todos.length + 1,
        isTodoCompleted: false,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  clearTodo = ({ target }) => {
    const todoId = this.state.todos.findIndex(todo => todo.id === +target.id);

    this.setState((state) => {
      const remainingTodos = [...state.todos];

      remainingTodos.splice(todoId, 1);

      return (
        {
          todos: [...remainingTodos],
        }
      );
    });
  };

  selectAllTodos = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        isTodoCompleted: target.checked,
      })),
    }));
  }

  handlerStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isTodoCompleted: !todo.isTodoCompleted,
          };
        }

        return todo;
      }),
    }));
  }

  clearCompletedTodo = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.isTodoCompleted),
    }));
  }

  filterTodos = (whichTodosToShow) => {
    const { todos } = this.state;

    switch (whichTodosToShow) {
      case 'active':
        return todos.filter(todo => !todo.isTodoCompleted);
      case 'completed':
        return todos.filter(todo => todo.isTodoCompleted);

      default:
        return todos;
    }
  }

  toggleActiveTodos = (filterName) => {
    this.setState({ todosToShow: filterName });
  }

  saveToLocalStorage() {
    const todos = JSON.stringify(this.state.todos);

    localStorage.setItem('todos', todos);
  }

  render() {
    const { todos, todosToShow } = this.state;
    const visibleTodos = this.filterTodos(todosToShow);

    return (
      <section className="todoapp">
        <TodoAdd updateTodosList={this.updateTodosList} />
        <TodoList
          todos={todos}
          handlerStatus={this.handlerStatus}
          selectAllTodos={this.selectAllTodos}
          clearTodo={this.clearTodo}
          tasks={visibleTodos}
        />
        {this.state.todos.length >= 1
          && (
            <Footer
              todos={this.state.todos}
              viewAllTodos={this.viewAllTodos}
              todosToShow={this.todosToShow}
              toggleActiveTodos={this.toggleActiveTodos}
              filterTodos={this.filterTodos}
              clearCompletedTodo={this.clearCompletedTodo}
            />
          )
        }

      </section>
    );
  }
}

export default App;
