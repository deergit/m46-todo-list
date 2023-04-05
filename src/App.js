import { useState } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';
import TaskItemComplete from './components/TaskItemComplete';

const App = () => {
    const [taskList, setTaskList] = useState([]);
    const [taskListCompleted, setTaskListCompleted] = useState([]);
    
    const getTime = () => {
        const date = new Date();
        return `${date.getHours()}:${date.getMinutes()} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    }

    const idGen = () => {
        return Math.floor(((Math.random() + 1) * 100000000)).toString(16);
    }
    
    const taskAdd = (e) => {
        e.preventDefault();

        const form = e.target;
        let taskObj = new FormData(form);
        taskObj = Object.fromEntries(taskObj.entries());
        const task = taskObj.todoItemInput;

        setTaskList([...taskList, {id: idGen(), item: task, date: getTime()}]);
    }

    const taskRemove = (id) => {
        setTaskList(taskList.filter(item => item.id !== id))
    }

    const taskComplete = (id) => {
        setTaskListCompleted([...taskListCompleted, taskList[taskList.findIndex((item) => item.id === id)]])
        setTaskList(taskList.filter(item => item.id !== id))
        console.log(taskListCompleted)
    }


    return (
        <div method="post" className="App">
            <h1>To Do List</h1>
            <form onSubmit={taskAdd}>
                <label form="todo-item-input">task:</label>
                <input type="text" id="todo-item-input" name="todoItemInput" />
                <input type="submit" value="Add" />
            </form>

            {taskList.length === 0 ? 
                <h2>Add some tasks!</h2> :
                taskList.map((task, index) => {
                    return (
                        <TaskItem key={index} task={task} taskRemove={taskRemove} taskComplete={taskComplete} />
                    )
                })
            }

            {taskListCompleted.length === 0 ? 
                <h2>And finish some too!</h2> :
                taskListCompleted.map((task, index) => {
                    return (
                        <TaskItemComplete key={index} task={task} taskRemove={taskRemove} />
                    )
                })
            }
        </div>
    );
}

export default App;