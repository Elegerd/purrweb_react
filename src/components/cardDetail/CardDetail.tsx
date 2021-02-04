import React, { useState } from "react";
import Textarea from "commonComponents/textarea/Textarea";
import TextareaGroup from "commonComponents/textareaGroup/TextareaGroup";
import Comment from "components/comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, patchCard, removeCard } from "routines/index";
import { getAuth } from "selectors/authSelector";
import "./cardDetail.css";

type Props = {
  columnTitle: string;
  card: Card;
  comments: Array<UserComment>;
};

const CardDetail: React.FunctionComponent<Props> = ({
  columnTitle,
  card,
  comments,
}) => {
  const { name }: AuthState = useSelector(getAuth);
  const dispatch = useDispatch();
  const [isNewComment, setIsNewComment] = useState(false);
  const [isEditTitle, setIsEditTitle] = useState(false);
  const [isEditDescription, setIsEditDescription] = useState(false);

  const onChangeCard = (data: {
    id: number;
    title?: string;
    description?: string;
  }) => dispatch(patchCard(data));
  const onAddComment = (newComment: UserComment) =>
    dispatch(addComment(newComment));
  const onRemoveCard = (id: number) => dispatch(removeCard(id));

  const handleOnClickSaveDescription = (value: string) => {
    onChangeCard({ id: card.id, description: value });
    setIsEditDescription(false);
  };

  const handleOnClickAddNewComment = (value: string) => {
    if (value.length)
      onAddComment({
        id: -1,
        value,
        card_id: card.id,
        author: name || "Guest",
        date: new Date(),
      });
    setIsNewComment(false);
  };

  const handleOnClickRemoveCard = () => onRemoveCard(card.id);

  const renderDescription = () => {
    const placeholder = "Добавить более подробное описание...";
    return isEditDescription ? (
      <TextareaGroup
        value={card.description}
        placeholder={placeholder}
        titleButton={"Сохранить"}
        onClick={handleOnClickSaveDescription}
      />
    ) : (
      <p
        className={"card-description__fake-description"}
        onClick={() => setIsEditDescription(true)}
      >
        {card.description || placeholder}
      </p>
    );
  };

  const renderComments = () => {
    const placeholder = "Напишите комментарий...";
    return (
      <>
        {isNewComment ? (
          <TextareaGroup
            placeholder={placeholder}
            titleButton={"Сохранить"}
            onClick={handleOnClickAddNewComment}
          />
        ) : (
          <p
            className={"card-description__fake-comment"}
            onClick={() => setIsNewComment(true)}
          >
            {placeholder}
          </p>
        )}
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            authName={name || "Guest"}
            comment={comment}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className={"card-modal__header"}>
        <Textarea
          isEdit={isEditTitle}
          value={card.title}
          onChangeIsEdit={(value) => setIsEditTitle(value)}
          onChangeValue={(value) => onChangeCard({ id: card.id, title: value })}
        />
        <div className={"header__column-title"}>в колонке {columnTitle}</div>
      </div>
      <div className="row card-modal__card-content">
        <div className="col-9 card-content__main">
          <div className={"card-content__card-description"}>
            <p className={"card-description__title"}>Описание</p>
            {renderDescription()}
          </div>
          <div className={"card-content__card-comments"}>
            <p className={"card-comments__title"}>Комментарии</p>
            {renderComments()}
          </div>
        </div>
        <div className="col-auto card-content__card_action">
          <p className={"card_action__creator"}>Создатель: {card.author}</p>
          <button
            className={"btn btn-danger"}
            onClick={handleOnClickRemoveCard}
          >
            Удалить карточку
          </button>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
