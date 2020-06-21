import React from "react";
import { useSelector } from "react-redux";
import Column from "@components/column/Column";
import PropTypes from "prop-types";
import "./board.css";

const Board = ({ title }) => {
  const { columns } = useSelector((state) => state.data);

  return (
    <div className={"board__wrapper"}>
      <div className={"board__board-header"}>
        <h2 className={"board-header__title"}>{title}</h2>
      </div>
      <div className={"board"}>
        <div className={"row"}>
          {columns.map((column) => {
            return <Column key={column.id} column={column} />;
          })}
        </div>
      </div>
    </div>
  );
};

Board.propTypes = {
  title: PropTypes.string,
};

export default Board;
