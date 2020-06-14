import React, {useState, useEffect, useContext} from "react";
import {DataContext, NameContext} from "../App";
import Popup from "../popup/Popup";
import Textarea from "../common_components/Textarea";
import TextareaGroup from "../common_components/TextareaGroup";
import "./card.css";


const Card = ({ columnTitle, card, comments }) => {
    const name = useContext(NameContext);
    const { onChangeData, onAddData, onRemoveData } = useContext(DataContext)
    const [isNewComment, setIsNewComment] = useState(false)
    const [isEditTitle, setIsEditTitle] = useState(false)
    const [isEditDescription, setIsEditDescription] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const changeCard = onChangeData('cards', card.id);
    const addComment = onAddData('comments')

    const handleOnClickCloseModal = () => {
        setIsOpenModal(false)
        setIsEditDescription(false)
        setIsEditTitle(false)
        setIsNewComment(false)
    }

    const handleOnKeyPress = e => {
        if (!e.shiftKey && e.which === 13) {
            setIsEditTitle(false)
            setIsEditDescription(false)
            e.preventDefault();
        }
    }

    const handleOnClickSaveDescription = (value) => {
        changeCard('description', value)
        setIsEditDescription(false)
    }

    const handleOnClickAddNewComment = (value) => {
        if (value.length)
            addComment({value, card_id: card.id, author: name})
        setIsNewComment(false)
    }

    const handleOnClickRemoveCard = e => onRemoveData('cards', card.id)

    const renderDescription = () => {
        const placeholder = 'Добавить более подробное описание...'
        return isEditDescription ?
            <TextareaGroup
                value={card.description}
                placeholder={placeholder}
                titleButton={'Сохранить'}
                onClick={handleOnClickSaveDescription}
            /> :
            <p className={'card-description__fake-textarea'}
               onClick={() => setIsEditDescription(true)}>
                {card.description || placeholder}
            </p>
    }

    const renderComments = () => {
        const placeholder = 'Напишите комментарий...'
        return isNewComment ?
            <TextareaGroup
                placeholder={placeholder}
                titleButton={'Сохранить'}
                onClick={handleOnClickAddNewComment}
            /> :
            <p className={'card-description__fake-textarea'}
               onClick={() => setIsNewComment(true)}>
                {placeholder}
            </p>
    }

    const renderPopup = () => {
        return (
            <Popup
                onClose={() => setIsOpenModal(false)}
                isDefaultHeader={false}
            >
                <div className={'popup__card-close'} onClick={handleOnClickCloseModal}>&#10006;</div>
                <div className={'card-modal'}>
                    <div className={'card-modal__header'}>
                        <Textarea
                            isEdit={isEditTitle}
                            value={card.title}
                            onBlur={(value) => setIsEditTitle(value)}
                            onKeyPress={handleOnKeyPress}
                            onChangeIsEdit={(value) => setIsEditTitle(value)}
                            onChangeValue={(value) => changeCard('title', value)}
                        />
                        <div className={'header__column-title'}>в колонке {columnTitle}</div>
                    </div>
                    <div className="row card-modal__card-content">
                        <div className="col-9 card-content__main">
                            <div className={'card-content__card-description'}>
                                <p className={'card-description__title'}>Описание</p>
                                {renderDescription()}
                            </div>
                            <div className={"card-content__card-comments"}>
                                <p className={'card-comments__title'}>Комментарии</p>
                                {renderComments()}
                            </div>
                        </div>
                        <div className="col card-content__card_action">
                            <p className={"card_action__creator"}>Создатель: {name}</p>
                            <button className={"btn btn-danger"} onClick={handleOnClickRemoveCard}>
                                Удалить карточку
                            </button>
                        </div>
                    </div>
                </div>
            </Popup>
        )
    }

    return (
        <>
            <div className={'card'} onClick={() => setIsOpenModal(true)}>
                <div className={'card__title'}>{card.title}</div>
                <div className={'card__badges'}>
                    {comments.length > 0  && <div title={'Комментарии'} className={'badges_comment'}>{comments.length}</div>}
                </div>
            </div>
            {isOpenModal && renderPopup()}
        </>
    );
};

export default Card;