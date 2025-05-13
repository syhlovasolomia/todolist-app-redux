import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { tasksReducer } from './task-reducer';
import { todolistsReducer } from './todolists-reducer';

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// @ts-expect-error well an error is expected
window.store = store;