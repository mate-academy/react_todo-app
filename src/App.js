import React from 'react';
import TodoList from './components/TodoList/TodoList';
import FormTodo from './components/FormTodo/FormTodo';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
    activeTab: '',
    statusAllTodos: true,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      originalTodos: [...prevState.todos, todo],
    }));
  };

  handleDelete = (todo) => {
    !todo.comleted
      && this.setState(prevState => ({ items: prevState.items - 1 }));
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(elem => elem.id !== todo.id),
      originalTodos: [...prevState.todos].filter(elem => elem.id !== todo.id),
    }));
  };

  handleClickCheckBox = (index) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((elem, i) => (i === index
        ? Object.assign(elem, { completed: !prevState.todos[i].completed })
        : elem)),
    }));

    switch (this.state.activeTab) {
      case 'active':
        this.filterActive();
        break;
      case 'all':
        this.filterAll();
        break;
      case 'completed':
        this.filterCompleted();
        break;
      default:
    }
  };

  filterAll = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos],
      activeTab: 'all',
    }));
  };

  filterActive = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(
        todo => todo.completed === false
      ),
      activeTab: 'active',
    }));
  };

  filterCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(
        todo => todo.completed === true
      ),
      activeTab: 'completed',
    }));
  };

  handleCheckAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
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
                todos={this.state.todos}
                handleDelete={this.handleDelete}
                handleClickCheckBox={this.handleClickCheckBox}
              />
              {this.state.originalTodos.length > 0 && (
                <Footer
                  todos={this.state.todos}
                  filterAll={this.filterAll}
                  filterActive={this.filterActive}
                  filterCompleted={this.filterCompleted}
                  activeTab={this.state.activeTab}
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
