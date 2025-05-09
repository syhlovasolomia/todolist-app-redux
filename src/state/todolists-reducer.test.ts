import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer,
} from './todolists-reducer';
import { v1 } from 'uuid';
import { FilterValuesType, TodoListType } from '../App';

test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const endState = todolistsReducer(startState, addTodoListAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe('all');
});

test('correct todolist should change it`s name', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = 'New Todolist';

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const action = changeTodoListTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter todolist should be changed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter: FilterValuesType = 'completed';

    const startState: Array<TodoListType> = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const action = changeTodoListFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
