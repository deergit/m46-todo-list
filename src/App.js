import { useState, useRef } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';
import TaskItemComplete from './components/TaskItemComplete';

const App = () => {
    const [taskList, setTaskList] = useState([]);
    const [taskListCompleted, setTaskListCompleted] = useState([]);
    const ref = useRef(null);
    
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
        form.reset();
    }

    const taskRemove = (id) => {
        setTaskList(taskList.filter(item => item.id !== id));
    }

    const taskComplete = (id) => {
        setTaskListCompleted([...taskListCompleted, taskList[taskList.findIndex((item) => item.id === id)]])
        setTaskList(taskList.filter(item => item.id !== id));
        console.log(taskListCompleted);
    }

    const taskRemoveCompleted = (id) => {
        setTaskListCompleted(taskListCompleted.filter(item => item.id !== id));
    }


    return (
        <div method="post" className="App">
            <h1>To Do List</h1>
            <form onSubmit={taskAdd} ref={ref}>
                <label form="todo-item-input">task:</label>
                <input type="text" id="todo-item-input" name="todoItemInput" />
                <input type="submit" id="submitBtn" value="Add" />
            </form>

            <div id="listContainer">
                <div id="leftCol">
                    <h2>Tasks to do:</h2>
                    {taskList.length === 0 ? 
                        <h3>Add some tasks!</h3> :
                        taskList.map((task, index) => {
                            return (
                                <TaskItem key={index} task={task} taskRemove={taskRemove} taskComplete={taskComplete} list={taskList} />
                            )
                        })
                    }
                </div>

                <div id="rightCol">
                    <h2>Tasks completed:</h2>
                    {taskListCompleted.length === 0 ? 
                        <h3>And finish some too!</h3> :
                        taskListCompleted.map((task, index) => {
                            return (
                                <TaskItemComplete key={index} task={task} taskRemove={taskRemoveCompleted} list={taskList} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default App;