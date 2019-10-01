import React from 'react';
import TodoList from './components/TodoList/TodoList';
import FormTodo from './components/FormTodo/FormTodo';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
    activeTab: 'all',
    statusAllTodos: true,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      originalTodos: [...prevState.originalTodos, todo],
    }));

    switch (this.state.activeTab) {
      case 'active':
        return this.filterActive();
      case 'all':
        return this.filterAll();
      case 'completed':
        return this.filterCompleted();
      default:
    }
  };

  handleDelete = (todo) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(elem => elem.id !== todo.id),
      originalTodos: prevState.todos.filter(elem => elem.id !== todo.id),
    }));
  };

  handleClickCheckBox = (index) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo, i) => (i === index
        ? Object.assign(todo, { completed: !prevState.todos[i].completed })
        : todo)),
    }));
  };

  filterAll = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos,
      activeTab: 'all',
    }));
  };

  filterActive = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos.filter(todo => todo.completed === false),
      activeTab: 'active',
    }));
  };

  filterCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos.filter(todo => todo.completed === true),
      activeTab: 'completed',
    }));
  };

  handleCheckAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.statusAllTodos,
      })),
      originalTodos: prevState.originalTodos.map(todo => ({
        ...todo,
        completed: prevState.statusAllTodos,
      })),
      statusAllTodos: !prevState.statusAllTodos,
    }));
  };

  clearAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      originalTodos: prevState.originalTodos.filter(todo => !todo.completed),
    }));
  };

  render() {
    const { todos, originalTodos, activeTab } = this.state;

    return (
      <>
        <section className="todoapp">
          <header className="header">
            <h1>TODOS</h1>
            <FormTodo addTodo={this.addTodo} />
          </header>

          <section className="main" style={{ display: 'block' }}>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onClick={this.handleCheckAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <>
              {' '}
              <TodoList
                todos={todos}
                handleDelete={this.handleDelete}
                handleClickCheckBox={this.handleClickCheckBox}
              />
              {originalTodos.length > 0 && (
                <Footer
                  todos={todos}
                  originalTodos={originalTodos}
                  filterAll={this.filterAll}
                  filterActive={this.filterActive}
                  filterCompleted={this.filterCompleted}
                  activeTab={activeTab}
                  clearAllCompleted={this.clearAllCompleted}
                />
              )}
            </>
          </section>
        </section>
      </>
    );
  }
}

export default App;
