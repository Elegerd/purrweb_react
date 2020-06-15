import React from "react";
import Column from "../column/Column";
import PropTypes from "prop-types";
import "./board.css";

const Board = ({ title, columns, cards, comments }) => {
  return (
    <div className={"board__wrapper"}>
      <div className={"board__board-header"}>
        <div className={"board-header__title"}>{title}</div>
      </div>
      <div className={"board"}>
        <div className="row">
          {columns.map((column) => {
            const column_cards = cards.filter(
              (card) => card.column_id === column.id
            );
            const column_comments = comments.filter((comment) =>
              column_cards.map((card) => card.id).includes(comment.card_id)
            );
            return (
              <Column
                key={column.id}
                column={column}
                cards={column_cards}
                comments={column_comments}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  cards: PropTypes.array,
  comments: PropTypes.array,
};

Board.defaultProps = {
  columns: [],
  cards: [],
  comments: [],
};

export default Board;
