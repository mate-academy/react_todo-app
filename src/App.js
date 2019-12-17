import React from 'react';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

export const FILTER_TYPES = {
  all: 'all',
  active: 'active',
  completed: 'completed',
};
export class App extends React.Component {
    state = {
      todos: [],
      inputText: '',
      counterId: 1,
      selectedFilterItem: FILTER_TYPES.all,
    }

    getTodoId = () => {
      const currentId = this.state.counterId;

      this.setState(prevState => ({
        counterId: prevState.counterId + 1,
      }));

      return currentId;
    }

    handleInputText = (event) => {
      this.setState({
        inputText: event.target.value,
      });
    }

    handleInputSubmit = (event) => {
      event.preventDefault();
      this.setState(state => ({
        inputText: '',
        todos: [...state.todos, {
          title: state.inputText,
          completed: false,
          id: this.getTodoId(),
        }],
      }));
    }

    addTodo = (id, title, complited) => {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            id, inputText: title, complited,
          }],
      }));
    };

    handleItemDestroyer = (itemId) => {
      this.setState(state => ({
        todos: state.todos.filter(todo => todo.id !== itemId),
      }));
    };

    handleItemsChecked = (itemId) => {
      this.setState(state => ({
        todos: state.todos.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              completed: !item.completed,
            };
          }

          return item;
        }),
      }));
    };

    handleCheckedAll = (checked) => {
      this.setState(state => ({
        todos: state.todos.map(item => ({
          ...item,
          completed: !checked,
        }
        )),
      }));
    };

    isAllChecked = () => this.state.todos.every(item => item.completed);

    clearCompletedItems = () => {
      this.setState(prevState => ({
        todos: state.todos.filter(item => !item.completed),
      }));
    };

    setItemFilter = (filter) => {
      this.setState({
        selectedFilterItem: filter,
      });
    };

    filterTodoItems = () => {
      const { all, active, completed } = FILTER_TYPES;
      const { todos } = this.state;

      switch (this.state.selectedFilterItem) {
        case active:
          return todos.filter(todo => !todo.completed);
        case completed:
          return todos.filter(todo => todo.completed);
        case all:
          return todos;
        default:
          return todos;
      }
    };

    render() {
      const filteredItems = this.filterTodoItems();
      const isAllChecked = this.isAllChecked();

      return (

        <section className="todoapp">
          <form
            className="header"
            onSubmit={this.handleInputSubmit}
          >
            <h1>todos</h1>

            <input
              value={this.state.inputText}
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleInputText}
            />
          </form>

          <TodoList
            todos={filteredItems}
            handleItemDestroyer={this.handleItemDestroyer}
            handleItemsCheck={this.handleItemsChecked}
            filterTodoItems={this.filterTodoItems}
            handleCheckedAll={this.handleCheckedAll}
            isAllChecked={isAllChecked}
          />

          {this.state.todos.length !== 0 && (
            <Footer
              todos={filteredItems}
              filterTodoItems={this.filterTodoItems}
              selectedFilterItem={this.state.selectedFilterItem}
              setItemFilter={this.setItemFilter}
              clearCompletedItems={this.clearCompletedItems}
            />
          )}

        </section>
      );
    }
}
