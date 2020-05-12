import React from 'react';
import TodoApp from './Component/TodoApp/TodoApp';
import TodoList from './Component/TodoList/TodoList';
import Nav from './Component/Nav/Nav';

class App extends React.Component {
  state = {
    activePage: 'All',
    id: 0,
    listOfTodo: [],
  }

  componentDidMount() {
    if (localStorage.getItem('list') !== null) {
      const s = JSON.parse(localStorage.getItem('list'));

      this.setState(s);
    }
  }

  componentDidUpdate = () => {
    localStorage.setItem('list', JSON.stringify(this.state));
  }

  handleSubmit = (event, newTodoText) => {
    event.preventDefault();

    if (newTodoText.replace(/ /g, '') === '') {
      return;
    }

    const sampleTodo = {
      id: this.state.id + 1,
      text: newTodoText.trim(),
      elementState: {
        completed: false,
        editing: false,
      },
    };

    this.setState(state => ({
      listOfTodo: [...state.listOfTodo, sampleTodo],
      id: state.id + 1,
    }));
  }

  handleCheckboxChange = (id) => {
    this.setState(state => ({ listOfTodo: state.listOfTodo.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        elementState: {
          ...todo.elementState,
          completed: !todo.elementState.completed,
        },
      };
    }) }));
  }

  handleClickDestroy = (id) => {
    this.setState(state => ({ listOfTodo: state.listOfTodo
      .filter(todo => todo.id !== id) }));
  }

  handleDoubleClick = (id, input) => {
    this.setState(state => ({
      listOfTodo: state.listOfTodo.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          elementState: {
            ...todo.elementState,
            editing: true,
          },
        };
      }),
    }));
  }

  handleEditing = (event, id, prevValue) => {
    const { value } = event.target;

    if (event.key === 'Enter') {
      this.setState(state => ({ listOfTodo: state.listOfTodo.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          text: value,
          elementState: {
            ...todo.elementState,
            editing: false,
          },
        };
      }) }));
    }

    if (event.key === 'Escape') {
      this.setState(state => ({ listOfTodo: state.listOfTodo.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          text: prevValue,
          elementState: {
            ...todo.elementState,
            editing: false,
          },
        };
      }) }));
    }
  }

  handleLossFocus = (event, id) => {
    const { value } = event.target;

    this.setState(state => ({ listOfTodo: state.listOfTodo.map((todo) => {
      if (todo.id !== id) {
        return todo;
      }

      return {
        ...todo,
        text: value,
        elementState: {
          ...todo.elementState,
          editing: false,
        },
      };
    }) }));
  }

  handleToggleAll = (event) => {
    const { checked } = event.target;

    this.setState(state => ({ listOfTodo: state.listOfTodo.map(todo => ({
      ...todo,
      elementState: {
        ...todo.elementState,
        completed: checked,
      },
    })) }));
  }

  handleSelectActivePage = (name) => {
    this.setState({ activePage: name });
  }

  handleClearCompleted = () => {
    this.setState(state => ({ listOfTodo: state.listOfTodo
      .filter(todo => !todo.elementState.completed) }));
  }

  render() {
    const { listOfTodo, activePage } = this.state;
    let visibleList;

    if (activePage === 'All') {
      visibleList = [...listOfTodo];
    } else if (activePage === 'Active') {
      visibleList = [...listOfTodo
        .filter(todo => todo.elementState.completed === false)];
    } else {
      visibleList = [...listOfTodo
        .filter(todo => todo.elementState.completed === true)];
    }

    return (
      <section className="todoapp">
        <TodoApp
          handleSubmit={this.handleSubmit}
        />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={listOfTodo
              .every(todo => todo.elementState.completed)}
            onChange={this.handleToggleAll}
          />
          <label
            hidden={listOfTodo.length === 0}
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
          <TodoList
            listOfTodo={visibleList}
            handleCheckboxChange={this.handleCheckboxChange}
            handleDoubleClick={this.handleDoubleClick}
            handleEditing={this.handleEditing}
            handleClickDestroy={this.handleClickDestroy}
            handleLossFocus={this.handleLossFocus}
          />
        </section>

        <footer hidden={listOfTodo.length === 0} className="footer">
          <span className="todo-count">
            {listOfTodo.reduce((acc, todo) => {
              if (todo.elementState.completed) {
                return acc - 1;
              }

              return acc;
            }, listOfTodo.length)
            }
            {' items left'}
          </span>
          <Nav
            handleSelectActivePage={this.handleSelectActivePage}
            activePage={activePage}
          />
          <button
            type="button"
            className="clear-completed"
            onClick={this.handleClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
