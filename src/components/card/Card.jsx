import React, { useState } from "react";
import Popup from "../../common_components/popup/Popup";
import CardDetail from "../cardDetail/CardDetail";
import PropTypes from "prop-types";
import "./card.css";

const Card = ({ columnTitle, card, comments }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOnClickCloseModal = (e) => {
    e.preventDefault();
    setIsOpenModal(false);
  };

  const renderPopup = () => {
    return (
      <Popup onClose={() => setIsOpenModal(false)}>
        <a
          href={"#"}
          className={"popup__card-close"}
          onClick={handleOnClickCloseModal}
        />
        <div className={"card-modal"}>
          <CardDetail
            columnTitle={columnTitle}
            card={card}
            comments={comments}
          />
        </div>
      </Popup>
    );
  };

  return (
    <>
      <div className={"card"} onClick={() => setIsOpenModal(true)}>
        <div className={"card__title"}>
          <h2>{card.title}</h2>
        </div>
        <div className={"card__badges"}>
          {comments.length > 0 && (
            <div title={"Комментарии"} className={"badges_comment"}>
              {comments.length}
            </div>
          )}
        </div>
      </div>
      {isOpenModal && renderPopup()}
    </>
  );
};

Card.propTypes = {
  columnTitle: PropTypes.string,
  card: PropTypes.shape({
    id: PropTypes.number,
    column_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  comments: PropTypes.array,
};

export default Card;
