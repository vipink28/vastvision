import React, { useEffect, useState } from "react";
import { requests } from "../helper/requests";
import axios from "../helper/axios";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";

function BrowseByGenre(props) {
    const [genreData, setGenreData] = useState(null);
    const [genreList, setGenreList] = useState(null);
    const [currentType, setCurrentType] = useState('tv');
    const param = useParams();

    const fetchVideosByGenre = async (id, type) => {
        const response = await axios.get(requests.getByGenre(id, type));
        setGenreData(response.data);
    }

    useEffect(() => {
        if (param) {
            fetchVideosByGenre(param.genreId, param.streamType);
        }
    }, [param]);

    const fetchGenreList = async (type) => {
        const response = await axios.get(requests.getGenre(type));
        setGenreList(response.data.genres);
    }

    const handleType = (e) => {
        const { value } = e.target;
        fetchGenreList(value);
        setCurrentType(value);
    }

    const handleGenre = (e) => {
        const { value } = e.target;
        fetchVideosByGenre(value, currentType);
    }

    return (
        <div className='container-fluid py-5'>
            <div className='d-flex py-4 gx-3 justify-content-end'>
                <p>Filter by</p>
                <select className='form-select w-auto ms-2' onChange={handleType}>
                    <option disabled selected>Select streamType</option>
                    <option value="tv">Tv</option>
                    <option value="movie">Movie</option>
                </select>

                <select className='form-select w-auto ms-2' onChange={handleGenre}>
                    <option disabled selected>Select Genre</option>
                    {
                        genreList?.map((genre) => (
                            <option key={genre?.id} value={genre?.id} >{genre?.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="row g-3">
                {
                    genreData?.results.map((video) => (
                        <div key={video.id} className='col-md-3'>
                            <Card video={video} streamType={param.streamType} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default BrowseByGenre;