import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppWithRedux from './AppWithRedux.tsx';
import { Provider } from 'react-redux';
import {store} from './state/store';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './state/theme.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
            <AppWithRedux />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
