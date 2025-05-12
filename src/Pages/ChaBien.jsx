import React from 'react'
import './ChaBien.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';

const ChaBien = () => {
    return (
        <div className="cha-bien-container">
            <center>
                <FontAwesomeIcon className="builder-icon" icon={faPersonDigging} style={{ fontSize: '200px', color: 'rgb(110, 216, 255)' }} />
                <div className="notice">
                    Trang này đang được hoàn chỉnh.
                </div>
            </center>
        </div>
    )
}

export default ChaBien
