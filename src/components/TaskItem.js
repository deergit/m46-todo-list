import { Textfit } from "react-textfit";
import "./TaskItem.css";

const TaskItem = (props) => {
    return (
        <div className="taskContainer">
            <div className="taskContent">
                <Textfit>{props.task.item}</Textfit>
            </div>

            <div className="taskControls">
                <p>Date added: {props.task.date}</p>
                <button onClick={() => props.taskComplete(props.task.id)}>Done</button>
                <button>Edit</button>
                <button onClick={() => props.taskRemove(props.task.id)}>Remove</button>
            </div>
        </div>
    );
}

export default TaskItem;