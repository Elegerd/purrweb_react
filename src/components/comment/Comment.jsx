import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import TextareaGroup from "../../common_components/textareaGroup/TextareaGroup";
import { DataContext, NameContext } from "../App";
import "./comment.css";

const Comment = ({ comment }) => {
  const name = useContext(NameContext);
  const { onChangeData, onRemoveData } = useContext(DataContext);
  const [isEditComment, setIsEditComment] = useState(false);

  const changeComment = onChangeData("comments", comment.id);
  const removeComment = onRemoveData("comments", comment.id);
  const handleOnClickRemove = (e) => {
    e.preventDefault();
    removeComment("comment");
  };

  const handleOnClickIsEdit = (e) => {
    e.preventDefault();
    setIsEditComment(true);
  };

  const handleOnClickChangeComment = (value) => {
    if (value.length) changeComment("value", value);
    setIsEditComment(false);
  };

  return (
    <div className={"comment"}>
      <div className={"comment__author"}>{comment.author}</div>
      <div className={"comment__comment-box"}>
        {isEditComment ? (
          <div className={"comment-box__content"}>
            <TextareaGroup
              value={comment.value}
              placeholder={"Вы ничего не написали!"}
              titleButton={"Сохранить"}
              onClick={handleOnClickChangeComment}
            />
          </div>
        ) : (
          <>
            <div className={"comment-box__content"}>{comment.value}</div>
            {comment.author === name && (
              <div className={"comment-box__comment-action"}>
                <a
                  className={"comment-action__edit"}
                  href="#"
                  onClick={handleOnClickIsEdit}
                >
                  Изменить
                </a>
                <a
                  className={"comment-action__remove"}
                  href="#"
                  onClick={handleOnClickRemove}
                >
                  Удалить
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    date: PropTypes.date,
    value: PropTypes.string,
  }),
};

Comment.defaultProps = {};

export default Comment;