import React, { useState, useEffect, useRef, createContext } from "react";
import {initStateApplication} from "../config";
import Header from "./header/Header";
import Board from "./board/Board";
import Popup from "./popup/Popup";


export const NameContext = createContext();

const App = () => {
    const nameInput = useRef(null);
    const [isOpenModalName, setIsOpenModalName] = useState(true)
    const [name, setName] = useState(null)
    const [applicationData, setApplicationData] = useState(initStateApplication)

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('purr_trello'))
        if (localData)
            setApplicationData(localData)
        return () => {
            localStorage.setItem('purr_trello', JSON.stringify(applicationData))
        }
    }, []);

    const handleOnSubmit = (e) => {
        setIsOpenModalName(false)
        setName(nameInput.current.value)
    };

    const renderPopupName = () => {
        return (
            <Popup title={'Введите имя'}>
                <input
                    ref={nameInput}
                />
                <button onClick={handleOnSubmit}>
                    Принять
                </button>
            </Popup>
        );
    };

    const handleOnChangeData = (dataType, id) => {
        return (field, value) => {
            setApplicationData(prevState => ({
                [dataType]: prevState[dataType].map(prevValue => {
                    if (prevValue.id === id)
                        return {
                            ...prevValue,
                            [field]: value
                        };
                    else
                        return prevValue;
                })
            }))
        };
    };

    return (
        <NameContext.Provider value={name}>
            <Header/>
            <main>
                <Board
                    title={'Основная доска'}
                    onChangeData={handleOnChangeData}
                    {...applicationData}
                />
            </main>
            {isOpenModalName && renderPopupName()}
        </NameContext.Provider>
    );
};

export default App;