import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string;
    onChange: (newValue: string) => void;
};

export function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(props.title);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title); 
    };

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    return editMode ? (
        <TextField
            value={title}
            onChange={onChangeTitleHandler}
            autoFocus
            onBlur={activateViewMode}
        />
    ) : (
        <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
}
