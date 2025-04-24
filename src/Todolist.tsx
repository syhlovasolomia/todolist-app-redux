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
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    filter: FilterValuesType;
};

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            props.addTask(title);
            setTitle('');
        }
    };

    const onAllClickhandler = () => props.changeFilter('all');
    const onActiveClickhandler = () => props.changeFilter('active');
    const onCompletedClickhandler = () => props.changeFilter('completed');

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangehandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onRemoveHandler = () => props.removeTask(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(t.id, e.currentTarget.checked);

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickhandler}
                >
                    All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickhandler}
                >
                    Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickhandler}
                >
                    Completed
                </button>
            </div>
        </div>
    );
}
