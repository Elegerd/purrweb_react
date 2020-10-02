import React, { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import Popup from "commonComponents/popup/Popup";
import CardDetail from "components/cardDetail/CardDetail";
import { getCardComments } from "selectors/commentSelector";
import "./card.css";

type Props = {
  columnTitle: string;
  card: Card;
};

const Card: React.FunctionComponent<Props> = ({ columnTitle, card }) => {
  const comments: Array<Comment> = useSelector(getCardComments(card));
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOnClickCloseModal = (e: MouseEvent) => {
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

export default Card;
