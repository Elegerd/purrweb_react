import React, { useEffect, useRef, useState } from "react";
import "./column.css";

const Column = ({ column, onChangeColumn }) => {
    const titleTextarea = useRef(null)
    const [isEditTitle, setIsEditTitle] = useState(false)

    useEffect(() => {
        return () => {
            titleTextarea.current.removeEventListener("keyup", handleEventTextarea, false);
        }
    }, [])

    const handleEventTextarea = (e) => {
        if (e.keyCode === 13) {
            setIsEditTitle(false)
        } else if(e.target.scrollTop > 0){
            e.target.style.height = e.target.scrollHeight + "px";
        }
    }

    const handleOnDoubleClickTitle = e => {
        setIsEditTitle(true)
        titleTextarea.current.addEventListener("keyup", handleEventTextarea, false);
    }

    const handleOnChangeTextarea = (e) => onChangeColumn('title', e.target.value)
    const handleOnKeyPressTextarea = (e) => {
        if (!e.shiftKey && e.which === 13) {
            e.preventDefault();
        }
    }

    return (
        <div className={'col column__wrapper'}>
            <div className={'column'}>
                <div className={"column__header"}
                    onDoubleClick={handleOnDoubleClickTitle}
                >
                    <textarea
                        ref={titleTextarea}
                        disabled={!isEditTitle}
                        onKeyPress={handleOnKeyPressTextarea}
                        onChange={handleOnChangeTextarea}
                        value={column.title}
                    />
                </div>
            </div>
        </div>
    );
};

export default Column;