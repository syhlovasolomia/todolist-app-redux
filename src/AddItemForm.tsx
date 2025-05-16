import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';
import React from 'react';

type addItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: addItemFormPropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangehandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
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
            <TextField
                value={title}
                variant={'outlined'}
                label={'Type value'}
                onChange={onChangehandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color={'primary'}>
                <ControlPoint />
            </IconButton>
        </div>
    );
});
