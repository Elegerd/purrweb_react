import React, { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Textarea from "commonComponents/textarea/Textarea";
import TextareaGroup from "commonComponents/textareaGroup/TextareaGroup";
import CardComponent from "components/card/Card";
import { addCard, patchColumn } from "routines/index";
import { getAuth } from "selectors/authSelector";
import { getColumnCards } from "selectors/cardSelector";
import "./column.css";

type Props = {
  column: Column;
};

const Column: React.FunctionComponent<Props> = ({ column }) => {
  const dispatch = useDispatch();
  const { name }: AuthState = useSelector(getAuth);
  const cards = useSelector(getColumnCards(column));

  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const onChangeColumn = (data: { id: number; title: string }) =>
    dispatch(patchColumn(data));
  const onAddCard = (newCard: Card) => dispatch(addCard(newCard));

  const handleOnClickCard = (value: string) => {
    if (value.length > 0)
      onAddCard({
        id: -1,
        title: value,
        column_id: column.id,
        author: name || "Guest",
        description: "",
      });
    setIsAddingCard(false);
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

  const handleOnClickNewCard = (e: MouseEvent) => {
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
            onChangeValue={(value) =>
              onChangeColumn({ id: column.id, title: value })
            }
            onChangeIsEdit={(value) => setIsEditTitle(value)}
          />
        </header>
        <div className={"column__list-cards"}>
          {cards.map((card) => {
            return (
              <CardComponent
                key={card.id}
                columnTitle={column.title}
                card={card}
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

export default Column;
