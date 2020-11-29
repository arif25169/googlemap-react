import { Popover, Space } from 'antd';
import React from 'react';
import './Marker.css';

const Marker = (props: any) => {

    const { color, name, lati, longi, mapImage } = props;

    const content = <>
        <img src={mapImage} alt="Car" style={{ width: 400, height: 400 }} />
        <br /> <br/>
        <Space size="large">
            <span>Latitude: {lati}</span>
            <span>Longitude: {longi}</span>
        </Space>
    </>
    return (
        <div>

            <Popover placement="bottom" title={name} content={content} trigger="click">
                <div
                    className="pin bounce"
                    style={{ backgroundColor: color, cursor: 'pointer' }}
                    title={name}
                />
                <div className="pulse" />
            </Popover>

        </div>
    );
};

export default Marker;