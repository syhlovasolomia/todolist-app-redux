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

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodoListFilterAC(todolistId, value);
        dispatch(action);
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodoListAC(todolistId);
        dispatch(action);
    };

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = changeTodoListTitleAC(id, newTitle);
        dispatch(action);
    }

    function addTodoList(title: string) {
        const action = addTodoListAC(title);
        dispatch(action);
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
                        return (
                            <Grid key={tl.id}>
                                <Paper style={{ padding: '20px' }}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
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

export default AppWithRedux;
