import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import CompleteAll from './CompleteAll';
import TodosFilter from './TodosFilter';
import ClearCompleted from './ClearCompleted';

class App extends React.Component {
  state = {
    todos: [],
    selectedFilter: 'all',
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          title,
          id: +new Date(),
          completed: false,
        },
      ],
    }));
  };

  markAllCompleted = (isCheckedAll) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: isCheckedAll,
      })),
    }));
  }

  markTodoCompleted = (isChecked, todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: isChecked,
        };
      }),
    }));
  }

  deleteTodo = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  }

  filterTodos = (filter) => {
    this.setState({
      selectedFilter: filter,
    });
  }

  clearCompleted = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
    }));
  }

  render() {
    const { todos, selectedFilter } = this.state;

    const notCompletedCount = todos
      .filter(todo => todo.completed === false).length;
    const completedCount = todos
      .filter(todo => todo.completed === true).length;
    const visibleTodos = todos
      .filter(todo => selectedFilter === 'all'
        || todo.completed === selectedFilter);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput addTodo={this.addTodo} />
        </header>

        <section
          className="main"
          style={todos.length === 0
            ? { display: 'none' }
            : { display: 'block' }}
        >

          <CompleteAll
            isCompletedAll={todos.every(todo => todo.completed)}
            markAllCompleted={this.markAllCompleted}
          />

          <TodoList
            todos={visibleTodos}
            markTodoCompleted={this.markTodoCompleted}
            deleteTodo={this.deleteTodo}
          />

        </section>

        <footer
          className="footer"
          style={todos.length === 0
            ? { display: 'none' }
            : { display: 'block' }}
        >

          <span className="todo-count">
            {notCompletedCount}
            {' '}
            items left
          </span>

          <TodosFilter
            filterTodos={this.filterTodos}
          />

          <ClearCompleted
            completedCount={completedCount}
            clearCompleted={this.clearCompleted}
          />

        </footer>
      </section>
    );
  }
}

export default App;
