import { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
            <h3> <EditableSpan title={props.title} onChange={changeTodoListTitle}/> 
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
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
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler} />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
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
