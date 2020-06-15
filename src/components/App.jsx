import React, { useState, useEffect, useRef, createContext } from "react";
import { initStateApplication } from "../config";
import Header from "./header/Header";
import Board from "./board/Board";
import Popup from "./popup/Popup";

export const NameContext = createContext();
export const DataContext = createContext();

const App = () => {
  const mounted = useRef();
  const nameInput = useRef(null);
  const [isOpenModalName, setIsOpenModalName] = useState(true);
  const [name, setName] = useState(null);
  const [applicationData, setApplicationData] = useState(initStateApplication);

  useEffect(() => {
    try {
      if (!mounted.current) {
        mounted.current = true;
        const localData = JSON.parse(localStorage.getItem("purr_trello"));
        if (localData) setApplicationData(localData);
      } else {
        localStorage.setItem("purr_trello", JSON.stringify(applicationData));
      }
    } catch (e) {
      console.error(e);
    }
  });

  const handleOnSubmit = (e) => {
    setIsOpenModalName(false);
    setName(nameInput.current.value || "Guest");
  };

  const renderPopupName = () => {
    return (
      isOpenModalName && (
        <Popup isOpen={isOpenModalName} title={"Введите имя"}>
          <input ref={nameInput} style={{ height: "37px" }} />
          <button
            style={{ marginLeft: "5px" }}
            className={"btn btn-secondary"}
            onClick={handleOnSubmit}
          >
            Принять
          </button>
        </Popup>
      )
    );
  };

  const onChangeData = (dataType, id) => {
    return (field, value) => {
      setApplicationData((prevState) => ({
        ...prevState,
        [dataType]: prevState[dataType].map((prevValue) => {
          if (prevValue.id === id)
            return {
              ...prevValue,
              [field]: value,
            };
          else return prevValue;
        }),
      }));
    };
  };

  const onAddData = (dataType) => {
    return (value) => {
      setApplicationData((prevState) => {
        const ids = prevState[dataType].map((v) => v.id);
        const newId = ids.length > 0 ? Math.max(...ids) + 1 : 0;
        return {
          ...prevState,
          [dataType]: [...prevState[dataType], { id: newId, ...value }],
        };
      });
    };
  };

  const onRemoveData = (dataType, id) => {
    return (field) => {
      setApplicationData((prevState) => {
        const keys = Object.keys(prevState);
        const newState = {};
        keys.forEach((key) => {
          const keyId = dataType === key ? "id" : `${field}_id`;
          newState[key] = prevState[key].filter((value) => value[keyId] !== id);
        });
        return newState;
      });
    };
  };

  return (
    <DataContext.Provider value={{ onChangeData, onAddData, onRemoveData }}>
      <NameContext.Provider value={name}>
        <Header />
        <main>
          <Board title={"Основная доска"} {...applicationData} />
        </main>
        {renderPopupName()}
      </NameContext.Provider>
    </DataContext.Provider>
  );
};

export default App;
