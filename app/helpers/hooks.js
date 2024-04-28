"use client"
import { useEffect, useState } from "react";
import { hideLoader, showLoader } from "../components/common/loader";
import { notification } from "antd";
import Swal from "sweetalert2";

export const useFetch = (func, query = {}, load = true) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(load)
    const [error, setError] = useState('')
    const [params, setParams] = useState(query)

    useEffect(() => {
        if (load) {
            getData(params)
        }
    }, []);

    const getData = (query) => {
        setLoading(true)
        setError('')
        setParams({ ...params, ...query })
        func({ ...params, ...query }).then(({ success, data, message, errorMessage }) => {
            setLoading(false)
            if (success) {
                setData(data)
            } else {
                setData(undefined)
                setError(errorMessage)
            }
        }).catch(e => {
            console.log(e)
        })
    }
    const clear = () => setData(undefined)
    return [data, getData, { query: params, loading, error, clear }];
}

export const useAction = async (func, data, reload, alert = true, successMsg) => {
    showLoader()
    const { success, message, errorMessage, data: d } = await func({ ...data })
    hideLoader()
    if (success) {
        if (reload) {
            reload(d)
        }
        if (alert) {
            notification.success({ message: successMsg || message || 'Success' })
        }
    } else {
        notification.error({ message: errorMessage || 'Something went wrong' })
    }
}

// onDelete,
// { _id: data._id },
// onReload, 'Are you sure you want to delete this item?', 'Yes, Delete'
export const useActionConfirm = async (func, data, reload, message, confirmText, alert = true) => {
    const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
    })
    if (isConfirmed) {
        await useAction(func, data, reload, alert)
    }
}

export const useOutSideClick = (ref, func) => {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                func && func()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}