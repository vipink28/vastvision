import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../hooks/documentTitle';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies, selectNowPlayingMovies, selectPopularMovies, selectTopRatedMovies, selectUpcomingMovies } from '../features/movie/movieSlice';
import Header from '../components/Header';
import { streamType } from '../helper/requests';
import Row from '../components/Row';
import { fetchAiringTodayShows, fetchOnTheAirShows, fetchPopularShows, fetchTopRatedShows, selectAiringTodayShows, selectOnTheAirShows, selectPopularShows, selectTopRatedShows } from '../features/tv/tvSlice';

function Homescreen(props) {
    useDocumentTitle("VastVision: Stream it All");
    const [video, setVideo] = useState(null);
    const { data, status, error } = useSelector(selectNowPlayingMovies);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNowPlayingMovies());
    }, [dispatch])

    useEffect(() => {
        if (data) {
            const randomIndex = Math.floor(Math.random() * data.results.length);
            setVideo(data.results[randomIndex]);
        }
    }, [data])

    return (
        <>
            <Header videoData={video} streamType={streamType.movie} />
            <div className="container-fluid">
                <Row title="Popular Movies" action={fetchPopularMovies} selector={selectPopularMovies} type={streamType.movie} isPoster={true} />
                <Row title="Now Playing Movies" action={fetchNowPlayingMovies} selector={selectNowPlayingMovies} type={streamType.movie} />
                <Row title="Popular Shows" action={fetchPopularShows} selector={selectPopularShows} type={streamType.tv} />
                <Row title="On Air Shows" action={fetchOnTheAirShows} selector={selectOnTheAirShows} type={streamType.tv} />
                <Row title="Top Rated Shows" action={fetchTopRatedShows} selector={selectTopRatedShows} type={streamType.tv} isPoster={true} />
                <Row title="Top Rated Movies" action={fetchTopRatedMovies} selector={selectTopRatedMovies} type={streamType.movie} />
                <Row title="Upcoming Movies" action={fetchUpcomingMovies} selector={selectUpcomingMovies} type={streamType.movie} />
                <Row title="Airing Today Shows" action={fetchAiringTodayShows} selector={selectAiringTodayShows} type={streamType.tv} />
            </div>
        </>
    );
}

export default Homescreen;