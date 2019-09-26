import React from 'react';
import NewTodo from './Components/NewTodo/NewTodo';
import TodoList from './Components/TodoList/TodoList';
import TodosFilter from './Components/TodosFilter/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
  }

  handleAddNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      originalTodos: [...prevState.originalTodos, todo],
    }));
  }

  handleTodoStatus = (todoId) => {
    this.setState(prevState => ({
      todos: [...prevState.todos]
        .map(todo => (
          todo.id === todoId
            ? { ...todo, completed: !todo.completed }
            : todo
        )),
      originalTodos: [...prevState.originalTodos]
        .map(orTodo => (
          orTodo.id === todoId
            ? { ...orTodo, completed: !orTodo.completed }
            : orTodo
        )),
    }));
  }

  handleShowAllTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos],
    }));
  }

  handleActiveTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(todo => !todo.completed),
    }));
  }

  handleCompletedTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(todo => todo.completed),
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <NewTodo addNewTodo={this.handleAddNewTodo} />

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todosList={todos}
            onChangeCompleted={this.handleTodoStatus}
          />
        </section>
        <TodosFilter
          onButtonAllChange={this.handleShowAllTodos}
          onButtonCompletedChange={this.handleCompletedTodos}
          onButtonActiveChange={this.handleActiveTodos}
          todosList={todos}
        />
      </section>
    );
  }
}

export default App;
