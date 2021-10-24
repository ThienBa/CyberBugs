import React from 'react'
import style from './Loading.module.css'
import { useSelector } from 'react-redux'

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducers)
    if(isLoading) {
        return (
            <div className={style.loadingPage}>
                <img src={require("../../assets/imgLoading/loading.gif").default} alt="Loading" />
            </div>
        )
    }else {
        return ""
    }
    
}
