type StateType = {
    age: number;
    childrenCount: number;
    name: string;
};

type ActionType = {
    type: string;
    [key: string]: unknown;
};

export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return { ...state, age: state.age + 1 };
        case 'INCREMENT-CHILDREN-COUNT':
            return { ...state, childrenCount: state.childrenCount + 1 };
        default:
            throw new Error('Unknown action type');
    }
};