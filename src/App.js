
import React from 'react';
import AddTodo from './components/AddTodo/AddTodo';
import ShowTodos from './components/ShowTodo/ShowTodo';
// import { runInThisContext } from 'vm';

class App extends React.Component {
  state = {
    todosOriginal: [],
    todosToShow: [],
    activeTab: 'all',
  }

  addTodo = (newTodo) => {
    const { activeTab } = this.state;

    this.setState((prevState) => {
      if (activeTab !== 'complete') {
        return ({
          todosOriginal: [...prevState.todosOriginal, newTodo],
          todosToShow: [...prevState.todosToShow, newTodo],
        });
      }

      if (activeTab === 'complete') {
        return ({
          todosOriginal: [...prevState.todosOriginal, newTodo],
        });
      }
    });
  }

  handleTodoStatus = (id) => {
    const { activeTab } = this.state;

    this.setState(prevState => ({
      todosOriginal: prevState.todosOriginal.map(item => (item.id === id
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
    const { todosOriginal, activeTab } = this.state;
    const checkStatus = todosOriginal.every(todo => todo.status
      === (true || false));

    this.setState(prevState => ({
      todosOriginal: prevState.todosOriginal.map(item => ({
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
      todosOriginal: prevState.todosOriginal.filter(item => item.id !== id),
      todosToShow: prevState.todosToShow.filter(item => item.id !== id),
    }));
  }

  removeCompleted = () => {
    const { activeTab } = this.state;

    this.setState(prevState => ({
      todosOriginal: prevState.todosOriginal
        .filter(item => item.status === false),
      todosToShow: prevState.todosOriginal.filter(item => item.status
        === false),
    }));
    this.showTodo(activeTab);
  }

  showTodo(activeTab) {
    switch (activeTab) {
      case 'all':
        this.setState(prevState => ({
          todosToShow: [...prevState.todosOriginal],
          activeTab: 'all',
        }));
        break;
      case 'active':
        this.setState(prevState => ({
          todosToShow: prevState.todosOriginal
            .filter(item => item.status === false),
          activeTab: 'active',
        }));
        break;
      default:
        this.setState(prevState => ({
          todosToShow: prevState.todosOriginal.filter(item => item.status
            === true),
          activeTab: 'complete',
        }));
        break;
    }
  }

  render() {
    const { activeTab, todosToShow, todosOriginal } = this.state;

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
            {todosOriginal.filter(item => item.status === false).length}
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
