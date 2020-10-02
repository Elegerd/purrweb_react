import React, { useState, MouseEvent } from "react";
import TextareaGroup from "commonComponents/textareaGroup/TextareaGroup";
import { useDispatch } from "react-redux";
import { removeComment, patchComment } from "routines";
import "./comment.css";

type Props = {
  authName: string;
  comment: UserComment;
};

const Comment: React.FunctionComponent<Props> = ({ authName, comment }) => {
  const dispatch = useDispatch();
  const [isEditComment, setIsEditComment] = useState(false);

  const onChangeComment = (comment: Comment) => dispatch(patchComment(comment));
  const onRemoveComment = (id: number) => dispatch(removeComment(id));

  const handleOnClickRemove = (e: MouseEvent) => {
    e.preventDefault();
    onRemoveComment(comment.id);
  };

  const handleOnClickIsEdit = (e: MouseEvent) => {
    e.preventDefault();
    setIsEditComment(true);
  };

  const handleOnClickChangeComment = (value: string) => {
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

export default Comment;
