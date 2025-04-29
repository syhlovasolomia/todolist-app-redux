import { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { IconButton, Button, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistsId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodoList: (todolistId: string) => void;
    changeTodoListTitle: (id: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
    const onAllClickhandler = () => props.changeFilter('all', props.id);
    const onActiveClickhandler = () => props.changeFilter('active', props.id);
    const onCompletedClickhandler = () => props.changeFilter('completed', props.id);
    const removeTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(props.id, newTitle);

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };

    return (
        <div>
            <h3>
                {' '}
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {props.tasks.map((t) => {
                    const onRemoveHandler = () => props.removeTask(t.id, props.id);
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    };

                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}
                            />
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
