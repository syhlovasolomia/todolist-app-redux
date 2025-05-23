import './App.css';
import { TaskType, Todolist } from './Todolist';
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
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from './state/todolists-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { useCallback } from 'react';

export type FilterValuesType = 'all' | 'completed' | 'active';

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodoListType>>((state) => state.todolists);

    const changeFilter = useCallback(
        (value: FilterValuesType, todolistId: string) => {
            dispatch(changeTodoListFilterAC(todolistId, value));
        },
        [dispatch]
    );

    const removeTodoList = useCallback(
        (todolistId: string) => {
            dispatch(removeTodoListAC(todolistId));
        },
        [dispatch]
    );

    const changeTodoListTitle = useCallback(
        (id: string, newTitle: string) => {
            dispatch(changeTodoListTitleAC(id, newTitle));
        },
        [dispatch]
    );

    const addTodoList = useCallback(
        (title: string) => {
            dispatch(addTodoListAC(title));
        },
        [dispatch]
    );

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">News</Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '10px' }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={10}>
                    {todolists.map((tl) => {
                        return (
                            <Grid key={tl.id}>
                                <Paper style={{ padding: '20px' }}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
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

export default AppWithRedux;
