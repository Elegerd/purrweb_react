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
                    setApplicationData(localData);
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
                <input ref={nameInput} style={{height: "37px"}}/>
                <button style={{marginLeft: "5px"}} className={'btn btn-secondary'} onClick={handleOnSubmit}>
                    Принять
                </button>
            </Popup>
        );
    };

    const onChangeData = (dataType, id) => {
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

    const onAddData = (dataType, column_id) => {
        return (value) => {
            setApplicationData(prevState => {
                const ids = prevState[dataType].map(v => v.id)
                const newId = ids.length > 0 ? Math.max(...ids) + 1 : 0;
                return ({
                    ...prevState,
                    [dataType]: [...prevState[dataType], { id: newId, column_id, ...value }]
                });
            })
        }
    }

    const onRemoveData = (dataType, id) => {
        return (field, value) => {
            setApplicationData(prevState => ({
                [dataType]: prevState[dataType].filter(v => v.id !== id)
            }))
        };
    }

    return (
        <NameContext.Provider value={name}>
            <Header/>
            <main>
                <Board
                    title={'Основная доска'}
                    onChangeData={onChangeData}
                    onAddData={onAddData}
                    onRemoveData={onRemoveData}
                    {...applicationData}
                />
            </main>
            {renderPopupName()}
        </NameContext.Provider>
    );
};

export default App;