import React from 'react';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

const todosArr = [];

class App extends React.Component {
  state ={
    idFiltres: '',
    todosList: todosArr,
    createNewTodo: '',
    isCompleted: true,
  }

  clearCompleted = () => {
    this.setState(state => ({
      todosList: state.todosList.filter(todo => todo.complete === false),
    }));
  }

  lengthCompeletedTodos = x => (
    this.state.todosList.filter(todo => todo.complete === x).length
  )

  setIdFiltres = (stateCompleted) => {
    this.setState({ idFiltres: stateCompleted });
  }

  filtresTodos = () => {
    switch (this.state.idFiltres) {
      case 'filtersActiv':
        return this.state.todosList.filter(todo => todo.complete === false);
      case 'filtersCompleted':
        return this.state.todosList.filter(todo => todo.complete === true);
      default: return this.state.todosList;
    }
  }

  enterNewTodo = (event) => {
    this.setState({ createNewTodo: event.target.value });
  }

  addNewTodo = (event) => {
    event.preventDefault();

    if (!this.state.createNewTodo.length > 0) {
      return;
    }

    this.setState(() => {
      const { todosList, createNewTodo } = this.state;
      const todo = {
        complete: false,
        id: +new Date(),
        title: createNewTodo,
      };

      return {
        todosList: [...todosList, todo],
        createNewTodo: '',
      };
    });
  }

  checkboxValue = (event) => {
    this.setState({ isCompleted: event.target.checked });
    this.allSelectTodo(this.state.isCompleted);
  };

  allSelectTodo = (x) => {
    this.setState(state => ({
      todosList: state.todosList.map(todo => (
        {
          ...todo, complete: x,
        })),
    }));
  }

  changeStateComplete = (todoId) => {
    this.setState(state => ({
      todosList: state.todosList.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          complete: !todo.complete,
        };
      }),
    }));
  }

  deleteTodo = (i) => {
    this.setState(state => state.todosList.splice(i, 1));
  }

  render() {
    const { todosList,
      createNewTodo,
      isCompleted,
      idFiltres } = this.state;

    const { addNewTodo,
      enterNewTodo,
      changeStateComplete,
      deleteTodo,
      setIdFiltres } = this;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp
            createNewTodo={createNewTodo}
            addNewTodo={addNewTodo}
            enterNewTodo={enterNewTodo}
          />
        </header>

        <section
          className="main"
          style={{ display: 'block' }}
        >
          <input
            onChange={this.checkboxValue}
            checked={isCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            filtresTodos={this.filtresTodos()}
            changeStateComplete={changeStateComplete}
            deleteTodo={deleteTodo}
          />
        </section>

        <footer
          className="footer"
          style={{
            display: `${todosList.length > 0 ? 'block' : 'none'}`,
          }}
        >
          <span className="todo-count">
            {this.lengthCompeletedTodos(false)}
            {` items left`}
          </span>
          <TodosFilter
            setIdFiltres={setIdFiltres}
            idFiltres={idFiltres}
          />
          <button
            type="button"
            className="clear-completed"
            style={{
              display: `${this.lengthCompeletedTodos(true) > 0
                ? 'block' : 'none'}`,
            }}
            onClick={() => this.clearCompleted()}
          >
            Clear-completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
