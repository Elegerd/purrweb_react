import React, { useState } from "react";
import PropTypes from "prop-types";
import TextareaGroup from "@common_components/textareaGroup/TextareaGroup";
import { useDispatch } from "react-redux";
import { removeComment, patchComment } from "@routines/index";
import "./comment.css";

const Comment = ({ authName, comment }) => {
  const dispatch = useDispatch();
  const [isEditComment, setIsEditComment] = useState(false);

  const onChangeComment = (id, data) => dispatch(patchComment({ id, data }));
  const onRemoveComment = (id) => dispatch(removeComment(id));

  const handleOnClickRemove = (e) => {
    e.preventDefault();
    onRemoveComment(comment.id);
  };

  const handleOnClickIsEdit = (e) => {
    e.preventDefault();
    setIsEditComment(true);
  };

  const handleOnClickChangeComment = (value) => {
    if (value.length) onChangeComment(comment.id, { value });
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
            {comment.author === authName && (
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
  authName: PropTypes.string,
  comment: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.string,
    date: PropTypes.date,
    value: PropTypes.string,
  }),
};

export default Comment;
