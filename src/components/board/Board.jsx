import React from "react";
import Column from "../column/Column";
import PropTypes from "prop-types";
import "./board.css";


const Board = ({ title, columns, cards, comments, onChangeData }) => {

    return (
        <div className={'board__wrapper'}>
            <div className={'board__header'}>
                <div className={'board__title'}>{title}</div>
            </div>
            <div className={'board'}>
                <div className="row">
                    {columns.map(column => (
                        <Column
                            column={column}
                            onChangeColumn={onChangeData('columns', column.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

Board.propsType = {
    title: PropTypes.string,
    columns: PropTypes.array,
    cards: PropTypes.array,
    comments: PropTypes.array,
    onChangeData: PropTypes.func
}

export default Board;