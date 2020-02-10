import React from 'react';
import icon from '../icons/marker.svg'

const ICON = icon;

const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
};

export default class CityPin extends React.Component {

    render() {
        const { size = 20, onClick } = this.props;

        return (
            <svg
                height={size}
                viewBox="0 0 24 24"
                style={{ ...pinStyle, transform: `translate(${-size / 2}px,${-size}px)` }}
                onClick={onClick}
            >
                <path d={ICON} />
            </svg>
        );
    }
}