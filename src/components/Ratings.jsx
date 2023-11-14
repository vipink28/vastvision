import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-regular-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Ratings(props) {
    const { voteAverage, voteCount } = props;
    let rating = voteAverage / 2;
    let count = Math.floor(rating);
    const totalStars = [...Array(5)];
    return (
        <div className='d-flex align-items-center mt-2 text-white'>
            {
                totalStars.map((item, index) => {
                    return (
                        index < count ?
                            <FontAwesomeIcon className='text-warning' icon={faStar} />
                            : <FontAwesomeIcon className='text-white' icon={faStarSolid} />
                    )
                })
            }

            <p className="ms-3 mb-0 fw-semibold">{rating.toFixed(1)} <span>({voteCount})</span></p>
        </div>
    );
}

export default Ratings;