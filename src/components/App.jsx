import React, { useState, useEffect, useRef, createContext } from "react";
import {initStateApplication} from "../config";
import Header from "./header/Header";
import Board from "./board/Board";
import Popup from "./popup/Popup";


export const NameContext = createContext();

const App = () => {
    const mounted = useRef();
    const nameInput = useRef(null);
    const [isOpenModalName, setIsOpenModalName] = useState(true)
    const [name, setName] = useState(null)
    const [applicationData, setApplicationData] = useState(initStateApplication)

    useEffect(() => {
        try {
            if (!mounted.current) {
                mounted.current = true;
                const localData = JSON.parse(localStorage.getItem('purr_trello'))
                if (localData)
                    setApplicationData(localData)
            } else {
                localStorage.setItem('purr_trello', JSON.stringify(applicationData))
            }
        } catch (e) {
            console.error(e)
        }
    });

    const handleOnSubmit = (e) => {
        setIsOpenModalName(false)
        setName(nameInput.current.value)
    };

    const renderPopupName = () => {
        return (
            <Popup isOpen={isOpenModalName} title={'Введите имя'}>
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
            {renderPopupName()}
        </NameContext.Provider>
    );
};

export default App;