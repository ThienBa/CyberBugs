import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { getAllCommentApiSagaActions } from '../../../redux/actions/CyberBugs/CommentActions';
import { getTaskDetailApiActions, updateStatusTasApiActions } from '../../../redux/actions/CyberBugs/TaskActions';

// JSON.stringify({ taskId: taskDetail.taskID, projectId: taskDetail.projectId })
export default function ContentCyberBugs(props) {
    const { lstTask } = props.projectDetail;
    const dispatch = useDispatch()

    const handleDragEnd = (result) => {
        let { projectId, taskId } = JSON.parse(result.draggableId);
        let { source, destination } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        dispatch(updateStatusTasApiActions(taskId, destination.droppableId, projectId))
    }

    const renderTaskProject = () => {
        return <DragDropContext onDragEnd={handleDragEnd}>
            {lstTask?.map((item, index) => {
                return <Droppable key={item.statusId.toString()} index={index} droppableId={item.statusId.toString()}>
                    {(provided) => {
                        return (
                            <div className="card" style={{ width: '16.5rem', minHeight: 'auto' }}>
                                <div className="card-header">
                                    {item.statusName}
                                </div>
                                <ul
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="list-group list-group-flush"
                                    style={{ height: '100%' }}
                                >
                                    {item.lstTaskDeTail?.map((taskDetail, index) => {
                                        return <Draggable key={taskDetail.taskId.toString()} index={index} draggableId={JSON.stringify({ taskId: taskDetail.taskId.toString(), projectId: taskDetail.projectId.toString() })}>
                                            {(provided) => {
                                                return (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="list-group-item" data-toggle="modal" data-target="#infoModal" onClick={() => {
                                                            dispatch(getTaskDetailApiActions(taskDetail.taskId));
                                                            dispatch(getAllCommentApiSagaActions(taskDetail.taskId))
                                                        }}>
                                                        <p>
                                                            {taskDetail.taskName}
                                                        </p>
                                                        <div className="block" style={{ display: 'flex' }}>
                                                            <div className="block-left">
                                                                {taskDetail.priorityTask.priority === "High" || taskDetail.priorityTask.priority === "Medium" ? <i className="fa fa-arrow-up text-success" /> : <i className="fa fa-arrow-down text-warning" />}
                                                            </div>
                                                            <div className="block-right">
                                                                <div className="avatar-group" style={{ display: 'flex' }}>
                                                                    {taskDetail.assigness?.map((assign, index) => {
                                                                        return (
                                                                            <div key={index} className="avatar">
                                                                                <img src={assign.avatar} alt={assign.name} />
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }}
                                        </Draggable>
                                    })}
                                </ul>
                                {provided.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            })
            }
        </DragDropContext>
    }

    return (
        <div className="content" style={{ display: 'flex' }}>
            {renderTaskProject()}
            {/*                
            <div className="card" style={{ width: '17rem', minHeight: '30rem' }}>
                <div className="card-header">
                    SELECTED FOR DEVELOPMENT 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', minHeight: '30rem' }}>
                <div className="card-header">
                    IN PROGRESS 2
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
            </div>
            <div className="card" style={{ width: '17rem', minHeight: '30rem' }}>
                <div className="card-header">
                    DONE 3
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Cras justo odio</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div> */}
        </div>

    )
}
