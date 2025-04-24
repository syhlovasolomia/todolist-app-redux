import { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TasksStateType = {
    [key: string]: TaskType[];
};

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todolistId1, title: 'What to learn', filter: 'active' },
        { id: todolistId2, title: 'What to buy', filter: 'completed' },
    ]);

    const removeTodoList = (todolistId: string) => {
        setTodoLists(todolists.filter((tl) => tl.id !== todolistId));
    
        const updatedTasks = { ...tasksObj };
        delete updatedTasks[todolistId];
        setTasks(updatedTasks);
    };

    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: false },
        ],
    });

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const filteredTasks = tasks.filter((t) => t.id !== id);
        setTasks({ ...tasksObj, [todolistId]: filteredTasks });
    }

    function addTask(title: string, todolistId: string) {
        const newTask = { id: v1(), title, isDone: false };
        const tasks = tasksObj[todolistId];
        const newTasks = [newTask, ...tasks];
        setTasks({ ...tasksObj, [todolistId]: newTasks });
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const tasks = tasksObj[todolistId].map((t) => (t.id === taskId ? { ...t, isDone } : t));
        setTasks({ ...tasksObj, [todolistId]: tasks });
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodoLists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter: value } : tl)));
    }

    return (
        <div className="App">
            {todolists.map((tl) => {
                let tasksForTodoList = tasksObj[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
                }
                if (tl.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                );
            })}
        </div>
    );
}

export default App;
