import { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]);

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

    const removeTodoList = (todolistId: string) => {
        setTodoLists(todolists.filter((tl) => tl.id !== todolistId));
        const updatedTasks = { ...tasksObj };
        delete updatedTasks[todolistId];
        setTasks(updatedTasks);
    };

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const filteredTasks = tasks.filter((t) => t.id !== id);
        setTasks({ ...tasksObj, [todolistId]: filteredTasks });
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todolist = todolists.find((tl) => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodoLists([...todolists]);
        }
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

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
        const tasks = tasksObj[todolistId].map((t) =>
            t.id === taskId ? { ...t, title: newTitle } : t
        );
        setTasks({ ...tasksObj, [todolistId]: tasks });
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodoLists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter: value } : tl)));
    }

    function addTodoList(title: string) {
        const todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,
        };

        setTodoLists([todolist, ...todolists]);
        setTasks({
            ...tasksObj,
            [todolist.id]: [],
        });
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '10px' }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map((tl) => {
                        let tasksForTodoList = tasksObj[tl.id];

                        if (tl.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
                        }

                        return (
                            <Grid item key={tl.id}>
                                <Paper style={{ padding: '20px' }}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
