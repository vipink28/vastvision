import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaderVideo, fetchVideoDetails, selectHeaderVideo, streamTypeAction } from '../features/common/commonSlice';
import { dateFormat, truncateText } from '../helper/helper';
import Ratings from './Ratings';
import VideoPlayer from './VideoPlayer';
import GenreLink from './GenreLink';
import Loading from './Loading';

function Header(props) {
    const { videoData, streamType } = props;
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(selectHeaderVideo)
    const [showVideo, setShowVideo] = useState(false);
    useEffect(() => {
        if (videoData) {
            dispatch(fetchHeaderVideo({ type: streamType, id: videoData.id }))
        }
    }, [videoData]);

    const getDetails = () => {
        dispatch(fetchVideoDetails({ type: streamType, id: data.id }));
        dispatch(streamTypeAction(streamType));
    }

    const handleVideo = () => {
        setShowVideo(true);
    };

    return (
        <div className='position-relative vh-100'>
            {data ?
                <>
                    {

                        !showVideo ?
                            <>
                                <img
                                    className="header-img"
                                    src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                                    alt="header"
                                />

                                <div className="caption">
                                    <h1 className="display-2 title mb-2 text-white ">
                                        {truncateText(data?.name || data?.original_name || data?.title || data?.original_title, 30)}
                                        {
                                            data?.first_air_date || data?.release_date ? <span className='ms-2 text-nowrap display-5'>({dateFormat(data?.first_air_date) || dateFormat(data?.release_date)})</span> : ""
                                        }
                                    </h1>
                                    {
                                        data?.tagline ? <h3 className='fs-2 tagline text-warning mb-4'>{data.tagline}</h3> : ""
                                    }
                                    <p className="fs-4 text-white">
                                        {truncateText(data?.overview, 150)}
                                    </p>

                                    {
                                        data?.genres ?
                                            <div className='d-flex'>
                                                {
                                                    data.genres.map((genre) => (
                                                        <GenreLink key={genre.id} genre={genre} type={streamType} isBadge={true} />
                                                    ))
                                                }
                                            </div> : ""
                                    }

                                    <Ratings
                                        voteAverage={data?.vote_average}
                                        voteCount={data?.vote_count}
                                    />

                                    <button
                                        className="btn btn-primary mt-3 me-2"
                                        onClick={handleVideo}
                                    >
                                        Play
                                    </button>
                                    <button
                                        className="btn btn-warning mt-3"
                                        data-bs-toggle="modal"
                                        data-bs-target="#videoDetails"
                                        onClick={getDetails}
                                    >
                                        More Info
                                    </button>


                                </div>
                                <div className="header-vignette"></div>
                                <div className="header-bottom-vignette"></div>
                            </> :
                            <VideoPlayer videoList={data?.videos.results} />
                    }
                </>
                : <div className='w-100 h-100 d-flex align-items-center justify-content-center'> <Loading /></div>
            }
        </div>
    );
}

export default Header;