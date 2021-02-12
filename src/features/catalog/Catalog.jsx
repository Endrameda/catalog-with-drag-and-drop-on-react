import React, { useState } from 'react';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './Catalog.scss';
import Nav from "../nav/Nav";
import ProductList from "../product-list/ProductList";

const Catalog = () => {
    const [ isList, setIsList ] = useState(false)
    return (
        <div className="catalog">
            <div className="catalog__top">
                <Nav/>
                <div onMouseOver={ () => setIsList(true) } onMouseOut={ () => setIsList(false) }
                     className="catalog__change-list"/>
            </div>
            <div className="catalog__body">
                <DndProvider backend={ HTML5Backend }>
                    <ProductList isList={ isList }/>
                </DndProvider>
            </div>
        </div>
    );
};

export default Catalog;
