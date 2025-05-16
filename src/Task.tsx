import { ChangeEvent, useCallback, memo } from 'react';
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
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    filter: FilterValuesType;
    removeTodoList: (todolistId: string) => void;
    changeTodoListTitle: (id: string, newTitle: string) => void;
};

export const Task = memo(
    ({ id, title, changeFilter, filter, removeTodoList, changeTodoListTitle }: PropsType) => {
        const dispatch = useDispatch();
        const tasks = useSelector<AppRootState, TaskType[]>((state) => state.tasks[id] || []);

        const handleAddTask = useCallback(
            (title: string) => {
                dispatch(addTaskAC(title, id));
            },
            [dispatch, id]
        );

        const handleRemoveTodoList = useCallback(() => {
            removeTodoList(id);
        }, [removeTodoList, id]);

        const handleChangeTodoListTitle = useCallback(
            (newTitle: string) => {
                changeTodoListTitle(id, newTitle);
            },
            [changeTodoListTitle, id]
        );

        const handleFilterChange = useCallback(
            (value: FilterValuesType) => {
                changeFilter(value, id);
            },
            [changeFilter, id]
        );

        const tasksToDisplay =
            filter === 'active'
                ? tasks.filter((t) => !t.isDone)
                : filter === 'completed'
                ? tasks.filter((t) => t.isDone)
                : tasks;

        return (
            <div>
                <h3>
                    <EditableSpan title={title} onChange={handleChangeTodoListTitle} />
                    <IconButton onClick={handleRemoveTodoList}>
                        <Delete />
                    </IconButton>
                </h3>
                <AddItemForm addItem={handleAddTask} />
                <div>
                    {tasksToDisplay.map((task) => {
                        const handleRemoveTask = () => dispatch(removeTaskAC(task.id, id));
                        const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, id));
                        };
                        const handleTitleChange = (newTitle: string) => {
                            dispatch(changeTaskTitleAC(task.id, newTitle, id));
                        };

                        return (
                            <div key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox checked={task.isDone} onChange={handleStatusChange} />
                                <EditableSpan title={task.title} onChange={handleTitleChange} />
                                <IconButton onClick={handleRemoveTask}>
                                    <Delete />
                                </IconButton>
                            </div>
                        );
                    })}
                </div>
                <div>
                    <Button
                        variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </Button>
                    <Button
                        color="primary"
                        variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={() => handleFilterChange('active')}
                    >
                        Active
                    </Button>
                    <Button
                        color="secondary"
                        variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => handleFilterChange('completed')}
                    >
                        Completed
                    </Button>
                </div>
            </div>
        );
    }
);
