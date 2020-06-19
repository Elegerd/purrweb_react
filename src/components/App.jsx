import React, { useState, useEffect, useRef, createContext } from "react";
import { Provider } from "react-redux";
import { initStateApplication } from "../config";
import rootSaga from "../sagas";
import configureStore from "../configureStore.js";
import Header from "./header/Header";
import Board from "./board/Board";
import Popup from "../common_components/popup/Popup";
import { getNewId, getData, setData, getUser, setUser } from "../utils";
import "./app.css";

export const NameContext = createContext();
export const DataContext = createContext();

const store = configureStore();
store.runSaga(rootSaga);

const App = () => {
  const mounted = useRef();
  const nameInput = useRef(null);
  const [isOpenModalName, setIsOpenModalName] = useState(false);
  const [applicationData, setApplicationData] = useState(initStateApplication);
  const [activeUser, setActiveUser] = useState("");

  useEffect(() => {
    try {
      if (!mounted.current) {
        mounted.current = true;
        const localData = getData();
        const localUser = getUser();
        if (localData) setApplicationData(localData);
        if (localUser) {
          setActiveUser(localUser);
        } else {
          setIsOpenModalName(true);
        }
      } else {
        setData(applicationData);
      }
    } catch (e) {
      console.error(e);
    }
  });

  const handleOnSubmit = (e) => {
    const user = nameInput.current.value || "Guest";
    setIsOpenModalName(false);
    setActiveUser(user);
    setUser(user);
  };

  const handleOnClickLogout = () => {
    setActiveUser("");
    setIsOpenModalName(true);
    setUser(null);
  };

  const renderPopupName = () => {
    return (
      isOpenModalName && (
        <Popup>
          <div className={"popup__modal-name"}>
            <div className={"modal-name__header"}>
              <h2>Введите имя</h2>
            </div>
            <div className={"modal-name__content"}>
              <input ref={nameInput} />
              <button className={"btn btn-secondary"} onClick={handleOnSubmit}>
                Принять
              </button>
            </div>
          </div>
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
        const newId = getNewId(prevState[dataType].map((v) => v.id));
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
    <Provider store={store}>
      <DataContext.Provider value={{ onChangeData, onAddData, onRemoveData }}>
        <NameContext.Provider value={activeUser}>
          <Header onClickLogout={handleOnClickLogout} />
          <main>
            <Board title={"Основная доска"} {...applicationData} />
          </main>
          {renderPopupName()}
        </NameContext.Provider>
      </DataContext.Provider>
    </Provider>
  );
};

export default App;
