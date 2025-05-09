import { userReducer } from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = { age: 99, childrenCount: 98, name: 'Molang' };

    const endState = userReducer(startState, { type: 'INCREMENT-AGE' });

    expect(endState.age).toBe(100);
    expect(endState.childrenCount).toBe(98);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 99, childrenCount: 98, name: 'Molang' };

    const endState = userReducer(startState, { type: 'INCREMENT-CHILDREN-COUNT' });

    expect(endState.age).toBe(99);
    expect(endState.childrenCount).toBe(99);
});

test('user reducer should change name of the user', () => {
    const startState = { name: 'Molang', age: 99, childrenCount: 98 };
    const newName = 'Piupiu';

    const endState = userReducer(startState, { type: 'CHANGE-NAME', newName: newName });

    expect(endState.name).toBe(newName);
});
