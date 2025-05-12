import React from 'react'
import './Micae.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging } from '@fortawesome/free-solid-svg-icons';

const VeThanhMicae = () => {
    return (
        <div className="micae-container">
            <center>
                <FontAwesomeIcon icon={faPersonDigging} style={{ fontSize: '200px', color: 'rgb(110, 216, 255)' }} />
                <div className="notice">
                    Trang này đang được hoàn chỉnh.
                </div>
            </center>
        </div>
    )
}

export default VeThanhMicae