import { Textfit } from "react-textfit";
import "./TaskItemComplete.css";

const TaskItem = (props) => {
    return (
        <div className="taskContainer">
            <div className="taskContent">
                <Textfit>{props.task.item}</Textfit>
            </div>

            <div className="taskControls">
                <p>Date added: {props.task.date}</p>
                <button>Edit</button>
                <button onClick={() => props.taskRemove(props.task.id)}>Remove</button>
            </div>
        </div>
    );
}

export default TaskItem;