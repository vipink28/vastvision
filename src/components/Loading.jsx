import React from 'react';

function Loading(props) {
    return (
        <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

export default Loading;