import React from 'react';
import TodoApp from './Component/TodoApp/TodoApp';
import TodoList from './Component/TodoList/TodoList';
import Nav from './Component/Nav/Nav';

class App extends React.Component {
  state = {
    activePage: 'All',
    id: 0,
    ListofTodo: [],
  }

  handleSubmit = (event, newTodoText) => {
    event.preventDefault();

    if (newTodoText === '') {
      return;
    }

    const sample = {
      id: this.state.id + 1,
      text: newTodoText,
      elementState: {
        completed: false,
        editing: false,
      },
    };

    this.setState(state => ({
      ListofTodo: state.ListofTodo.concat([{ ...sample }]),
      id: state.id + 1,
    }));
  }

  handleCheckboxChange = (id) => {
    this.setState(state => ({ ListofTodo: state.ListofTodo.map((todo) => {
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
    this.setState(state => ({ ListofTodo: state.ListofTodo
      .filter(todo => todo.id !== id) }));
  }

  handleDoubleClick = (id) => {
    this.setState(state => ({
      ListofTodo: state.ListofTodo.map((todo) => {
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

  handleEditing = (event, id) => {
    const { value } = event.target;

    if (event.key === 'Enter') {
      this.setState(state => ({ ListofTodo: state.ListofTodo.map((todo) => {
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
  }

  handleLossFocus = (event, id) => {
    const { value } = event.target;

    this.setState(state => ({ ListofTodo: state.ListofTodo.map((todo) => {
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

    if (checked) {
      this.setState(state => ({ ListofTodo: state.ListofTodo.map(todo => ({
        ...todo,
        elementState: {
          ...todo.elementState,
          completed: true,
        },
      })) }));
    } else {
      this.setState(state => ({ ListofTodo: state.ListofTodo.map(todo => ({
        ...todo,
        elementState: {
          ...todo.elementState,
          completed: false,
        },
      })) }));
    }
  }

  handleSelectAll = () => {
    this.setState({ activePage: 'All' });
  }

  handleSelectActive = () => {
    this.setState({ activePage: 'Active' });
  }

  handleSelectComplited = () => {
    this.setState({ activePage: 'Completed' });
  }

  hanleClearComplited = () => {
    this.setState(state => ({ ListofTodo: state.ListofTodo
      .filter(todo => todo.elementState.completed !== true) }));
  }

  render() {
    const { ListofTodo, activePage } = this.state;
    let visibleList;

    if (activePage === 'All') {
      visibleList = [...ListofTodo];
    } else if (activePage === 'Active') {
      visibleList = [...ListofTodo
        .filter(todo => todo.elementState.completed === false)];
    } else {
      visibleList = [...ListofTodo
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
            checked={ListofTodo
              .every(todo => todo.elementState.completed === true)}
            onClick={this.handleToggleAll}
          />
          <label
            hidden={ListofTodo.length === 0}
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>
          <TodoList
            ListofTodo={visibleList}
            handleCheckboxChange={this.handleCheckboxChange}
            handleDoubleClick={this.handleDoubleClick}
            handleEditing={this.handleEditing}
            handleClickDestroy={this.handleClickDestroy}
            handleLossFocus={this.handleLossFocus}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {ListofTodo.reduce((acc, todo) => {
              if (todo.elementState.completed) {
                return acc - 1;
              }

              return acc;
            }, ListofTodo.length)
            }
            {' items left'}
          </span>
          <Nav
            handleSelectAll={this.handleSelectAll}
            handleSelectActive={this.handleSelectActive}
            handleSelectComplited={this.handleSelectComplited}
            activePage={activePage}
          />
          <button
            type="button"
            className="clear-completed"
            onClick={this.hanleClearComplited}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
