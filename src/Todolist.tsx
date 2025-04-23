import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
};

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('');
    };

    const onAllClickhandler = () => {
        props.changeFilter('all');
    };

    const onActiveClickhandler = () => {
        props.changeFilter('active');
    };

    const onCompletedClickhandler = () => {
        props.changeFilter('completed');
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id);
                    };
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={onAllClickhandler}>All</button>
                <button onClick={onActiveClickhandler}>Active</button>
                <button onClick={onCompletedClickhandler}>Completed</button>
            </div>
        </div>
    );
}
