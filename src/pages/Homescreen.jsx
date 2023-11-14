import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPopularShows } from '../features/tv/tvSlice';
import useDocumentTitle from '../hooks/documentTitle';

function Homescreen(props) {
    useDocumentTitle("VastVision: Stream it All");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchPopularShows());
    }, [])
    return (
        <div>
            Homescreen
        </div>
    );
}

export default Homescreen;