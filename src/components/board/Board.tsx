import React from "react";
import { useSelector } from "react-redux";
import Column from "components/column/Column";
import { getData } from "selectors/dataSelector";
import "./board.css";

type Props = {
  title: string;
};

const Board: React.FunctionComponent<Props> = ({ title }) => {
  const { columns }: { columns: Array<Column> } = useSelector(getData);

  return (
    <div className={"board__wrapper"}>
      <div className={"board__board-header"}>
        <h2 className={"board-header__title"}>{title}</h2>
      </div>
      <div className={"board"}>
        <div className={"row"}>
          {columns.map((column: Column) => {
            return <Column key={column.id} column={column} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
