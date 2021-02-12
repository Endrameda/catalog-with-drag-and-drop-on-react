import React, { useRef, useState } from 'react';
import axios from "axios";
import { useDrag, useDrop } from "react-dnd";

import './Product.scss';

import imagePlaceholder from '../../assets/images/image-gallery.svg';

const Product = ({ src, name, desc, price, id, moveCard, index }) => {
    const ref = useRef(null);
    const [ editable, setEditable ] = useState(false)
    const nameRef = useRef()

    const handleClickName = () => {
        nameRef.current.setAttribute('contenteditable', true)
        setEditable(true)
    }

    const handleClickOnButton = () => {
        const newName = nameRef.current.innerText.trim()
        if ( !newName ) return alert('Название продукта не может быть пустым, пожалуйста заполните его!')
        axios.patch(`http://localhost:3001/products/${ id }`, {
            name : newName
        }).catch(() => alert('Что-то пошло не так, пожалуйста попробуйте еще раз!'))
        nameRef.current.setAttribute('contenteditable', false)
        setEditable(false)
    }

    const [ , drop ] = useDrop({
        accept : 'card',
        hover (item, monitor) {
            if ( !ref.current ) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if ( dragIndex === hoverIndex ) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if ( dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) {
                return;
            }
            // Dragging upwards
            if ( dragIndex > hoverIndex && hoverClientY > hoverMiddleY ) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    });

    const [ { isDragging }, drag ] = useDrag({
        item : { type : 'card', id, index },
        collect : (monitor) => ({
            isDragging : monitor.isDragging()
        })
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div ref={ ref } style={ { opacity, transition : '0.2s linear' } } className="product">
            <div className="product__inner">
                <div className="product__img">
                    <img
                        src={ src ? src : imagePlaceholder }
                        alt={ name }
                    />
                </div>
                <div className="product__name">
                    <div className="product__title"
                         onClick={ handleClickName }
                         ref={ nameRef }>{ name }
                    </div>
                    { editable &&
                    <button className="product__button" onClick={ handleClickOnButton }>Готово</button>
                    }
                </div>
                <div className="product__desc">{ desc }</div>
                <div className="product__price">{ price } руб.</div>
            </div>
        </div>
    );
};

export default Product;
