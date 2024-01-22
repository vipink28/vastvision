import React from "react";
import { useDispatch } from "react-redux";
import placeholderImg from '../assets/img-placeholder-dark.jpg';
import { fetchVideoDetails, streamTypeAction } from "../features/common/commonSlice";
import { truncateText } from "../helper/helper";
import Ratings from "./Ratings";
import { useNavigate } from "react-router-dom";

function Card(props) {
    const { video, streamType, isPoster } = props;
    const navigate = useNavigate();
    const getDetails = () => {
        navigate(`/details/${streamType}/${video.id}`);
    }
    return (

        <div className="card h-100 rounded-3" onClick={getDetails}>
            {
                isPoster ? <img src={video?.backdrop_path ? `https://image.tmdb.org/t/p/original/${video?.poster_path}` : placeholderImg} className="card-img-top" alt="..." /> :
                    <img src={video?.backdrop_path ? `https://image.tmdb.org/t/p/original/${video?.backdrop_path}` : placeholderImg} className="card-img-top" alt="..." />
            }

            <div className="card-body text-white ">
                <h5 className="card-title">{video?.name || video?.title || video?.original_title}</h5>
                <p>{truncateText(video?.overview, 60)}</p>
                <Ratings voteAverage={video?.vote_average} voteCount={video?.vote_count} />
            </div>
        </div>

    );
}

export default Card;
