import { FilterValuesType, TodoListType } from '../AppWithRedux';
import { v1 } from 'uuid';

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
};

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST';
    title: string;
    todoListId: string;
};

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    id: string;
    title: string;
};

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string;
    filter: FilterValuesType;
};

type ActionsType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType;

const initialState: Array<TodoListType> = [];

export const todolistsReducer = (
    state: Array<TodoListType> = initialState,
    action: ActionsType
): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id != action.id);
        }

        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.todoListId,
                    title: action.title,
                    filter: 'all',
                },
                ...state,
            ];
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find((tl) => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }

        default:
            return state;
    }
};

export const removeTodoListAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title, todoListId: v1() };
};

export const changeTodoListTitleAC = (
    todolistId: string,
    title: string
): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title };
};

export const changeTodoListFilterAC = (
    todoListId: string,
    filter: FilterValuesType
): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter };
};
