import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from "react-redux";
import update from "immutability-helper";

import { selectProducts } from "../product/productsSlice";
import Product from "../product/Product";
import './ProductList.scss';

const ProductList = ({ isList }) => {
    const [cards, setCards] = useState(useSelector(selectProducts))

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(
                update(cards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard]
                    ]
                })
            );
        },
        [cards]
    );

    const renderCard = (card, index) => {
        return (
            <Product
                key={card.id}
                index={index}
                {...card}
                moveCard={moveCard}
            />
        );
    };
    return (
        <div className={ classNames("product-list", { 'list' : isList }) }>
            <div className="product-list__header">
                <div className="product-list__header-name">
                    Модель
                </div>
                <div className="product-list__header-desc">
                    Описание
                </div>
                <div className="product-list__header-price">
                    Цена
                </div>
            </div>
            <div className="product-list__inner">
                {cards.map((card, i) => renderCard(card, i))}
            </div>
        </div>
    );
};

export default ProductList;
    