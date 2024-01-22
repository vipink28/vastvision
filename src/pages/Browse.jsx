import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { shuffle } from '../helper/helper';
import { requests } from '../helper/requests';
import axios from '../helper/axios';
import useDocumentTitle from '../hooks/documentTitle';
import Row from '../components/Row';

function Browse(props) {
    useDocumentTitle("VastVision: Stream it All");
    const { streamType } = useParams();
    const [vidoeList, setVidoeList] = useState(null);
    const [video, setVideo] = useState(null);
    const [genreList, setGenreList] = useState(null);

    const getVideoByRating = async (streamType) => {
        const response = await axios.get(requests.discoverByRating(streamType));
        setVidoeList(response.data.results);
    };

    const getGenreList = async (type) => {
        const response = await axios(requests.getGenre(type));
        const res = shuffle(response.data.genres);
        setGenreList(res);
    }

    useEffect(() => {
        if (streamType) {
            getVideoByRating(streamType);
            getGenreList(streamType);
        }
    }, [streamType])

    useEffect(() => {
        if (vidoeList) {
            const randomIndex = Math.floor(Math.random() * vidoeList?.length);
            setVideo(vidoeList[randomIndex]);
        }
    }, [vidoeList])

    return (
        <>
            <Header videoData={video} streamType={streamType} />
            <div className="container-fluid">
                {
                    genreList?.map((genre, index) => (
                        index < 6 ?
                            <Row title={genre?.name} type={streamType} genres={genre} /> : ""
                    ))
                }
            </div>
        </>
    );
}

export default Browse;