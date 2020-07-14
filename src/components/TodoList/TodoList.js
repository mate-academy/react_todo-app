import React from 'react';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { TodoListShape } from '../Shapes/TodoListShape';
import { addHighLight } from '../Helpers/addHighlight';

export class TodoList extends React.Component {
    state = {
      defaultList: [...this.props.generalList],
      onToggle: 'default',
      value: 0,
    };

    static getDerivedStateFromProps(props, state) {
      if (props.generalList !== state.defaultList) {
        return {
          defaultList: props.generalList,
        };
      }

      return null;
    }

    handleShowActive = (index) => {
      this.setState({
        onToggle: 'active',
        value: index,
      });
    }

    handleShowCompleted = (index) => {
      this.setState({
        onToggle: 'completed',
        value: index,
      });
    }

    handleShowAll = (index) => {
      this.setState({
        onToggle: 'default',
        value: index,
      });
    }

    render() {
      const { onToggle, defaultList, value } = this.state;
      const {
        checkBoxId,
        handleChecked,
        handleClearCompleted,
        handleClearTask,
        handleMarkAll,
        isTouched,
      } = this.props;
      const completedTasks = Array.from(Object.values(checkBoxId))
        .filter(task => task !== false).length;
      const remainedTasks = defaultList.length - completedTasks;
      let updatedList = [];

      switch (onToggle) {
        case 'active':
          updatedList = defaultList
            .filter(task => !checkBoxId[task.id] === true);
          break;
        case 'completed':
          updatedList = defaultList
            .filter(task => checkBoxId[task.id] === true);
          break;
        default:
          updatedList = defaultList;
      }

      return (
        <>
          <section className="main">
            <input
              type="checkbox"
              onClick={() => handleMarkAll(isTouched)}
              id="toggle-all"
              className="toggle-all"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {updatedList.map(todoItem => (
                <li
                  className={addHighLight(todoItem.id, checkBoxId)}
                  key={todoItem.id}
                >
                  <div className="view">
                    <input
                      type="checkbox"
                      className="toggle"
                      id={`todo-${todoItem.id}`}
                      checked={checkBoxId[todoItem.id] === true}
                      onChange={(event) => {
                        handleChecked(todoItem.id, event.target.checked);
                      }}
                    />
                    <label>{todoItem.task}</label>
                    <button
                      type="button"
                      onClick={() => handleClearTask(todoItem.id)}
                      className="destroy"
                    />
                  </div>
                  <input type="text" className="edit" />
                </li>
              ))}
            </ul>
          </section>
          <TodoFooter
            remainedTasks={remainedTasks}
            value={value}
            defaultList={defaultList}
            handleClearCompleted={handleClearCompleted}
            handleShowActive={this.handleShowActive}
            handleShowCompleted={this.handleShowCompleted}
            handleShowAll={this.handleShowAll}
          />
        </>
      );
    }
}

TodoList.propTypes = TodoListShape.isRequired;
