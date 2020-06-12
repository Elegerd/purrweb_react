import React, { useState } from "react";
import Textarea from "../common_components/Textarea";
import "./column.css";


const Column = ({ column, cards, comments, onChangeColumn }) => {
    const [isEditTitle, setIsEditTitle] = useState(false)

    return (
        <div className={'col column__wrapper'}>
            <div className={'column'}>
                <div className={'column__column-header'}>
                    <Textarea
                        value={column.title}
                        isEdit={isEditTitle}
                        onChangeValue={(value) => onChangeColumn('title', value)}
                        onChangeIsEdit={(value) => setIsEditTitle(value)}
                    />
                </div>
                <div className={'column__list-cards'}>

                </div>
                <div className={'column__column-footer'}>
                    <div
                        className={'column-footer__new-card'}
                    >
                        Добавить еще одну карточку
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Column;