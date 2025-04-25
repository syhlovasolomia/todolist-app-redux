import { ChangeEvent, KeyboardEvent, useState } from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void;
};

export function AddItemForm(props: addItemFormPropsType) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            if (title.trim()) {
                props.addItem(title.trim());
                setTitle('');
            } else {
                setError('Title is required');
            }
        }
    };

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    };
    return (
        <div>
            <input
                value={title}
                onChange={onChangehandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
