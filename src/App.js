import React from 'react';
import NewTodo from './component/NewTodo/NewTodo';
import TodoList from './component/TodoList/TodoList';
import Footer from './component/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
    id: 0,
    selected: 'all',
    complitedAll: false,
  }

  selectedTab = () => {
    switch (this.state.selected) {
      case 'completed':
        this.onClickCompleted();
        break;
      case 'active':
        this.onClickActive();
        break;
      default:
        this.onClickAllTodos();
        break;
    }
  }

  addNewTodo = (inputValue) => {
    this.setState(prevState => ({
      id: prevState.id + 1,
      selected: prevState.selected,
      originalTodos: [...prevState.originalTodos,
        {
          id: prevState.id + 1,
          title: inputValue,
          completed: false,
        }],

      todos: [...prevState.todos,
        {
          id: prevState.id + 1,
          title: inputValue,
          completed: false,
        }],
    }));

    this.selectedTab();
  }

  checkBoxClick = (todo) => {
    this.setState(prevState => ({
      originalTodos: prevState.originalTodos
        .map((element) => (element.id === todo.id
          ? Object.assign(element, { completed: !todo.completed })
          : element)),
      todos: [...this.state.originalTodos],
    }));

    this.selectedTab();
  };

  onClickActive = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos.filter(todo => !todo.completed),
      selected: 'active',
    }));
  };

  onClickAllCompleted = () => {
    this.setState(prevState => ({
      complitedAll: !prevState.complitedAll,
      originalTodos: prevState.originalTodos.map(todo => ({
        ...todo,
        completed: !prevState.complitedAll,
      })),
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !prevState.complitedAll,
      })),
    }))
  };

  onClickCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos].filter(todo => todo.completed),
      selected: 'completed',
    }));
  };

  onClickAllTodos = () => {
    this.setState(prevState => ({
      todos: [...prevState.originalTodos],
      selected: 'all',
    }));
  };

  onClickClearCompleted = () => (
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        !todo.completed
      )),
      originalTodos: prevState.originalTodos.filter(todo => (
        !todo.completed
      )),
    }))
  );

  deleteTodo = (element) => {
    const { todos } = this.state;
    const filteredList = todos.filter(todo =>
      todo.id !== element.id
    );

    this.setState({
      originalTodos: filteredList,
      todos: filteredList,
    });
  }

  render() {
    const { todos, selected, originalTodos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all"/>
          <label
            htmlFor="toggle-all"
            onClick={this.onClickAllCompleted}
          >
            Mark all as complete
          </label>

          <TodoList
            todos={todos}
            deleteTodo={this.deleteTodo}
            checkBoxClick={this.checkBoxClick}
          />
        </section>

        {originalTodos.length > 0 && (
          <Footer
            todos={todos}
            selected={selected}
            onClickAllTodos={this.onClickAllTodos}
            onClickActive={this.onClickActive}
            onClickCompleted={this.onClickCompleted}
            onClickClearCompleted={this.onClickClearCompleted}
          />
        )}
      </section>
    );
  }
}

export default App;
