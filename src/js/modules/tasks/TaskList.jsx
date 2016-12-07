import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { toggle, tasks } from './tasksReducer';

/*
export default connect(
  state => ({
    tasks: state.tasks
  })
)(TaskList);

const plus = x => y => x + y;
function plus(x) {
  return function(y) {
    return x + y;
  }
}

*/

@connect(
  state => ({
    tasks: tasks(state)
  })
)
export default class TaskList extends React.Component {

  static propTypes = {
    text: P.string,
    tasks: P.array.isRequired
  };

  toggleCompleted(i) {
    return () => this.props.dispatch(toggle(i));
  }

  render() {
    const { tasks } = this.props;
    const { text } = this.props;
    return (
        <div>
            <h1>Hello, {text}</h1>
            <ol>
              {tasks.map((task, i) =>
                <Item
                  key={i}
                  text={task.text}
                  completed={task.completed}
                  onChange={this.toggleCompleted(i)}
                />
              )}
            </ol>
        </div>
    );
  }
}

const Item = ({ text, completed, onChange }) =>
  <li>
    <label>
      <input type="checkbox" checked={completed} onChange={onChange} />
      {text}
      {completed ? " (completed)" : null}
    </label>
  </li>
;
