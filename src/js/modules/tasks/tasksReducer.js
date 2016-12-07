
const initialState = {
  tasks: [
    {text: 'Learn JS',    completed: false },
    {text: 'Learn React', completed: true  },
    {text: 'Learn Redux', completed: false },
  ]
};

export const TASK_TOGGLE = 'TASK_TOGGLE';

export const toggle = (index) => ({ type: TASK_TOGGLE, index: index });

export const tasks = state => state.tasks.tasks;

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case TASK_TOGGLE:
      return {
        ...state,
        tasks: state.tasks.map((task, i) => ({
          ...task,
          completed: i === action.index ? ! task.completed : task.completed,
        }))
      };

    default:
      return state;
  }
}
