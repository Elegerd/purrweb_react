import React, { useState, useContext } from "react";
import { DataContext } from "../App";
import Textarea from "../../common_components/textarea/Textarea";
import TextareaGroup from "../../common_components/textareaGroup/TextareaGroup";
import Card from "../card/Card";
import PropTypes from "prop-types";
import "./column.css";

const Column = ({ column, cards, comments }) => {
  const { onChangeData, onAddData } = useContext(DataContext);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const changeColumn = onChangeData("columns", column.id);
  const addCard = onAddData("cards");

  const handleOnClickCard = (value) => {
    if (value.length > 0)
      addCard({ title: value, column_id: column.id, description: "" });
    setIsAddingCard(false);
  };

  const handleOnKeyPressTitle = (e) => {
    if (!e.shiftKey && e.which === 13) {
      e.preventDefault();
      setIsEditTitle(false);
    }
  };

  const renderNewCard = () => {
    return (
      <TextareaGroup
        placeholder={"Ввести заголовок для этой карточки"}
        titleButton={"Добавить карточку"}
        onClick={handleOnClickCard}
      />
    );
  };

  const handleOnClickNewCard = (e) => {
    e.stopPropagation();
    setIsAddingCard(true);
  };

  return (
    <div className={"col column__wrapper"}>
      <div className={"column"}>
        <header className={"column__column-header"}>
          <Textarea
            value={column.title}
            isEdit={isEditTitle}
            onBlur={(value) => setIsEditTitle(value)}
            onKeyPress={handleOnKeyPressTitle}
            onChangeValue={(value) => changeColumn("title", value)}
            onChangeIsEdit={(value) => setIsEditTitle(value)}
          />
        </header>
        <div className={"column__list-cards"}>
          {cards.map((card) => {
            const card_comments = comments.filter(
              (comment) => comment.card_id === card.id
            );
            return (
              <Card
                key={card.id}
                columnTitle={column.title}
                card={card}
                comments={card_comments}
              />
            );
          })}
        </div>
        <footer className={"column__column-footer"}>
          {isAddingCard ? (
            renderNewCard()
          ) : (
            <div
              className={"column-footer__button"}
              onClick={handleOnClickNewCard}
            >
              <input
                type={"button"}
                onClick={handleOnClickNewCard}
                value={"Добавить еще одну карточку"}
              />
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  cards: PropTypes.array,
  comments: PropTypes.array,
};

Column.defaultProps = {
  cards: [],
  comments: [],
};

export default Column;
