import { ChangeEvent } from 'react';
import { FilterValuesType } from './AppWithRedux';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { IconButton, Button, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './state/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    changeFilter: (value: FilterValuesType, todolistsId: string) => void;
    filter: FilterValuesType;
    removeTodoList: (todolistId: string) => void;
    changeTodoListTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
    const tasksObj = useSelector<AppRootState, Array<TaskType>>((state) => state.tasks[props.id]);
    const dispatch = useDispatch();

    const onAllClickhandler = () => props.changeFilter('all', props.id);
    const onActiveClickhandler = () => props.changeFilter('active', props.id);
    const onCompletedClickhandler = () => props.changeFilter('completed', props.id);
    const removeTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(props.id, newTitle);

    const allTodolistTasks = tasksObj;
    let tasksForTodoList = allTodolistTasks;

    if (props.filter == "active") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone === false);
    }
     if (props.filter == "completed") {
        tasksForTodoList = allTodolistTasks.filter(t => t.isDone === true);
    }

    return (
        <div>
            <h3>
                {' '}
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm
                addItem={(title) => {
                    dispatch(addTaskAC(title, props.id));
                }}
            />
            <div>
                {tasksForTodoList.map((t) => {
                    const onRemoveHandler = () => dispatch(removeTaskAC(t.id, props.id));
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.id));
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.id));
                    };

                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                            <IconButton onClick={onRemoveHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickhandler}
                >
                    All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickhandler}
                >
                    Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickhandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
}
