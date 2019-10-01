
import React from 'react';
import AddTodo from './components/AddTodo/AddTodo';
import ShowTodos from './components/ShowTodo/ShowTodo';

class App extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem('todoData')) || [],
    todosToShow: JSON.parse(localStorage.getItem('todoData')) || [],
    activeTab: 'all',
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos.length !== this.state.todos.length) {
      const json = JSON.stringify(this.state.todos);

      localStorage.setItem('todoData', json);
    }
  }

  addTodo = (newTodo) => {
    const { activeTab } = this.state;

    this.setState((prevState) => {
      return activeTab !== 'complete' ? ({
        todos: [...prevState.todos, newTodo],
        todosToShow: [...prevState.todosToShow, newTodo],
      }) : ({
        todos: [...prevState.todos, newTodo],
      });
    });
  };

  handleTodoStatus = (id) => {
    const { activeTab } = this.state;

    this.setState(prevState => ({
      todos: prevState.todos.map(item => (item.id === id
        ? {
          title: item.title,
          id: item.id,
          status: !item.status,
        }
        : item)),
      todosToShow: prevState.todosToShow.map(item => (item.id === id
        ? {
          title: item.title,
          id: item.id,
          status: !item.status,
        }
        : item)),
    }));
    this.showTodo(activeTab);
  }

  handleCheckedTodos = () => {
    const { todos, activeTab } = this.state;
    const checkStatus = todos.every(todo => (
      todo.status === (true || false)
    ));

    this.setState(prevState => ({
      todos: prevState.todos.map(item => ({
        title: item.title,
        id: item.id,
        status: checkStatus ? !item.status : true,
      })),
      todosToShow: prevState.todosToShow.map(item => ({
        title: item.title,
        id: item.id,
        status: checkStatus ? !item.status : true,
      })),
    }));
    this.showTodo(activeTab);
  }

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
      todosToShow: prevState.todosToShow.filter(item => item.id !== id),
    }));
  }

  removeCompleted = () => {
    const { activeTab } = this.state;

    this.setState(prevState => ({
      todos: prevState.todos
        .filter(item => item.status === false),
      todosToShow: prevState.todos.filter(item => (
        item.status === false
      )),
    }));
    this.showTodo(activeTab);
  }

  showTodo(activeTab) {
    switch (activeTab) {
      case 'all':
        this.setState(prevState => ({
          todosToShow: [...prevState.todos],
          activeTab: 'all',
        }));
        break;
      case 'active':
        this.setState(prevState => ({
          todosToShow: prevState.todos
            .filter(item => item.status === false),
          activeTab: 'active',
        }));
        break;
      default:
        this.setState(prevState => ({
          todosToShow: prevState.todos.filter(item => (
            item.status === true
          )),
          activeTab: 'complete',
        }));
    }
  }

  render() {
    const { activeTab, todosToShow, todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodo
            addTodo={this.addTodo}
          />
        </header>
        <ShowTodos
          handleCheckedTodos={this.handleCheckedTodos}
          todosToShow={todosToShow}
          handleTodoStatus={this.handleTodoStatus}
          removeTodo={this.removeTodo}
        />
        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {todos.filter(item => item.status === false).length}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={activeTab === 'all' ? 'selected' : null}
                onClick={() => this.showTodo('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={activeTab === 'active' ? 'selected' : null}
                onClick={() => this.showTodo('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={activeTab === 'complete' ? 'selected' : null}
                onClick={() => this.showTodo('complete')}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.removeCompleted}
          >
            Delete completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
