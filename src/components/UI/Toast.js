
import React, { useContext, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { toastStore } from '../../store/toast';

export default function ToastContainer() {
    const { state } = useContext(toastStore);
    const toast = useRef(null);
    useEffect(() => {
        if (state.severity === 'error') {
           toast.current.show({severity:'error', summary: 'Ooops...', detail: state.message, life: 3000});
        }
        if (state.severity === 'warn') {
            toast.current.show({severity:'warn', summary: 'Warning', detail: state.message, life: 3000});
        }
        if (state.severity === 'info') {
            toast.current.show({severity:'info', summary: 'Info', detail: state.message, life: 3000});
        }
        if (state.severity === 'success') {
            toast.current.show({severity:'success', summary: 'Success', detail: state.message, life: 3000});
        }
    })
    return (
        <div className="card flex justify-content-center">
            {toast ? <Toast ref={toast} /> : null}
        </div>
    )
}
        