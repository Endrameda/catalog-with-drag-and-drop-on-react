import React, { useEffect, Suspense, useState } from 'react';
import axios from "axios";
import './App.scss';
import { useDispatch } from "react-redux";

import Catalog from "./features/catalog/Catalog";
import { setProducts } from "./features/product/productsSlice";


function App () {
    const [ successQueries, setSuccessQueries ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:3001/products').then(({ data }) => {
                dispatch(setProducts(data))
            })
        ]).then(() => {
            setSuccessQueries(true)
        })
    }, [])

    if ( !successQueries ) {
        return <h2>Загрузка...</h2>
    }

    return (
        <div className="app">
            <Catalog/>
        </div>
    );
}

export default App;
