import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requests } from '../helper/requests';
import axios from '../helper/axios';
import VideoPlayer from '../components/VideoPlayer';
import Ratings from '../components/Ratings';
import { dateFormat, formatCurrency, numToTime } from '../helper/helper';
import GenreLink from '../components/GenreLink';
import Card from '../components/Card';
import justWatch from '../assets/JustWatch.webp';
import EpisodeList from '../components/EpisodeList';

function Details(props) {
    const { streamType, videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [similarVideos, setSimilarVideos] = useState(null);
    const [recommendedVideos, setRecommendedVideos] = useState(null);
    const [credits, setCredits] = useState(null);
    const [director, setDirector] = useState(null);
    const [producer, setProducer] = useState(null);
    const [watchProviders, setWatchProviders] = useState(null);

    const fetchDetails = async (type, id) => {
        const response = await axios.get(requests.getDetails({ type, id }));
        setVideo(response.data);
    }
    const fetchCredits = async (type, id) => {
        const response = await axios.get(requests.getCredits(type, id));
        setCredits(response.data);
        const director = response.data.crew.filter(item => item.job === 'Director');
        setDirector(director);
        const producer = response.data.crew.filter(item => item.job === 'Producer' || item.job === 'Executive Producer');
        setProducer(producer);
    }

    const fetchSimilarVideos = async (type, id) => {
        const response = await axios.get(requests.getSimilar(type, id));
        setSimilarVideos(response.data.results);
    };

    const fetchRecommendedVideos = async (type, id) => {
        const response = await axios.get(requests.getRecommended(type, id));
        setRecommendedVideos(response.data.results);
    };

    const fetchWatchProviders = async (type, id) => {
        const response = await axios.get(requests.getWatchProviders(type, id));
        setWatchProviders(response.data.results);
    };



    useEffect(() => {
        if (streamType && videoId) {
            fetchDetails(streamType, videoId);
            fetchCredits(streamType, videoId);
            fetchSimilarVideos(streamType, videoId);
            fetchRecommendedVideos(streamType, videoId);
            fetchWatchProviders(streamType, videoId);
        }

    }, [videoId, streamType])

    return (
        <>
            <div className='py-5 mt-2 container-fluid px-5 d-flex flex-column vh-100'>

                {
                    video ?
                        <VideoPlayer videoList={video?.videos.results} isDetails={true} /> : ""
                }

            </div>
            <div className='container-fluid px-5 text-white'>
                <div className='row'>
                    <div className="col-md-3">
                        <div className='rounded-5 overflow-hidden'>
                            <img className='img-fluid' src={`https://image.tmdb.org/t/p/original/${video?.poster_path}`} alt="" />
                        </div>
                        <div className='mt-5'>
                            <img style={{ width: 200 }} src={justWatch} alt="" />
                            <a className='text-white d-block mb-3' href='https://www.justwatch.com/'>Visit Just Watch to view</a>
                            <div className='d-flex flex-wrap gy-3'>
                                {
                                    watchProviders?.US?.buy?.map((item) => (
                                        <div className='d-flex w-50 align-items-center'>
                                            <img style={{ width: 32 }} className='me-2' src={`https://image.tmdb.org/t/p/original/${item?.logo_path}`} alt="" />
                                            <p>{item?.provider_name}</p>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                    </div>
                    <div className="col-md-9">
                        <h2 className='display-3 fw-bold'>{video?.name || video?.original_name || video?.title || video?.original_title}</h2>
                        {
                            video?.tagline ? <h3 className='fs-3 tagline text-warning mb-4'>{video.tagline}</h3> : ""
                        }
                        <div className='py-2 d-flex align-items-center gap-3'>
                            <Ratings
                                voteAverage={video?.vote_average}
                                voteCount={video?.vote_count}
                            />
                            <span className='mt-2'>•</span>
                            <div className='mt-2'>{dateFormat(video?.first_air_date) || dateFormat(video?.release_date)}</div>
                            <span className='mt-2'>•</span>
                            <div className='mt-2'>{numToTime(video?.runtime || video?.episode_run_time)}</div>
                            {video?.number_of_seasons ? <div className='mt-2'>{video?.number_of_seasons} Seasons</div> : ""}
                        </div>
                        {
                            video?.genres ?
                                <div className='d-flex mt-2'>
                                    {
                                        video.genres.map((genre) => (
                                            <GenreLink key={genre.id} genre={genre} type={streamType} isBadge={true} />
                                        ))
                                    }
                                </div> : ""
                        }
                        <p className='mt-3'>{video?.overview}</p>
                        <p>
                            <strong>Cast: </strong>
                            {
                                credits?.cast.map((castVal, index) => (
                                    index <= 10 ? <span key={castVal.id}>{castVal.name}, </span> : ""
                                ))
                            }
                        </p>
                        <p>
                            <strong>Production Companies: </strong>
                            {
                                video?.production_companies.map((production, index) => (
                                    index <= 10 ? <span key={production.id}>{production.name}, </span> : ""
                                ))
                            }
                        </p>
                        <p>
                            <strong>Producers: </strong>
                            {
                                producer?.map((production, index) => (
                                    index <= 10 ? <span key={production.id}>{production.name}, </span> : ""
                                ))
                            }
                        </p>
                        <p>
                            <strong>Directors: </strong>
                            {
                                director?.map((production, index) => (
                                    index <= 10 ? <span key={production.id}>{production.name}, </span> : ""
                                ))
                            }
                        </p>
                        {
                            video?.revenue ?
                                <p>
                                    <strong>Revenue: </strong>
                                    <span>{formatCurrency(video?.revenue)}</span>
                                </p> : ""
                        }

                        {
                            recommendedVideos?.length > 0 ?
                                <div className="row gy-3 mt-5 pb-5">
                                    <h5 className='fs-3'>Recommended {streamType === "tv" ? "Shows" : "Movies"}</h5>
                                    {recommendedVideos?.map((item, index) => {
                                        return (
                                            index < 6 ?
                                                <div key={item.id} className="col-lg-2">
                                                    <Card video={item} streamType={streamType} isPoster={true} />
                                                </div> : ""
                                        )
                                    })}
                                </div> : ""
                        }
                        {
                            similarVideos?.length > 0 ?
                                <div className="row gy-3 mt-5 pb-5">
                                    <h5 className='fs-3'>Similar {streamType === "tv" ? "Shows" : "Movies"}</h5>
                                    {similarVideos?.map((item, index) => {
                                        return (
                                            index < 6 ?
                                                <div key={item.id} className="col-lg-2">
                                                    <Card video={item} streamType={streamType} isPoster={true} />
                                                </div> : ""
                                        )
                                    })}
                                </div> : ""
                        }

                    </div>
                </div>
                {
                    video?.seasons ?
                        <EpisodeList tvId={video?.id} seasons={video?.seasons} /> : ""
                }
            </div>
        </>
    );
}

export default Details;