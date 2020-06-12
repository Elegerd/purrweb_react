import React, { useState, useEffect, useRef } from "react";
import Textarea from "../common_components/Textarea";
import "./column.css";


const Column = ({ column, cards, comments, onChangeColumn, onAddCard }) => {
    const newCard = useRef()
    const [newCardTitle, setNewCardTitle] = useState('')
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isAddingCard, setIsAddingCard] = useState(false)


    useEffect(() => {
        document.addEventListener('click', handleOnClickNewCard)
        return () => {
            document.removeEventListener('click', handleOnClickNewCard)
        }
    }, [])

    const handleOnClickNewCard = (e) => {
        if (newCard.current && !newCard.current.contains(e.target)) {
            setIsAddingCard(false)
            setNewCardTitle('')
        }
    }

    const handleOnClickButtonNewCard = (e) => {
        if (newCardTitle.length) {
            onAddCard({title: newCardTitle})
            setIsAddingCard(false)
            setNewCardTitle('')
        }
    }

    const renderNewCard = () => {
        return (
            <div ref={newCard} className={'new-card'}>
                <Textarea
                    value={newCardTitle}
                    onChangeValue={(value) => setNewCardTitle(value)}
                    onChangeIsEdit={(value) => setIsAddingCard(value)}
                />
                <div className={'new-card__container-button'}>
                    <button
                        onClick={handleOnClickButtonNewCard}
                        className={'container-button__button'}
                    >
                        Добавить карточку
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={'col column__wrapper'}>
            <div className={'column'}>
                <div className={'column__column-header'}>
                    <Textarea
                        value={column.title}
                        isEdit={isEditTitle}
                        onBlur={(value) => setIsEditTitle(value)}
                        onChangeValue={(value) => onChangeColumn('title', value)}
                        onChangeIsEdit={(value) => setIsEditTitle(value)}
                    />
                </div>
                <div className={'column__list-cards'}>

                </div>
                <div className={'column__column-footer'}>
                    {isAddingCard ?
                        renderNewCard() :
                        <div
                            className={'column-footer__new-card'}
                            onClick={(e) => setIsAddingCard(true)}
                        >
                            Добавить еще одну карточку
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Column;