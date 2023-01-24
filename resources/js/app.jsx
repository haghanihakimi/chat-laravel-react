import './bootstrap';
import React from 'react';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import store from './store/store'
import { Provider } from 'react-redux'

createInertiaApp({
    'id': 'app',
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<Provider store={store}><App {...props} /></Provider>)
    },
})