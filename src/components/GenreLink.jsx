import { Link } from 'react-router-dom';

function GenreLink(props) {
    const { genre, type, isBadge, isLast } = props;
    return (
        <Link to={`/browsebygenre/${type}/${genre.id}`} className={`fs-6  fw-normal text-decoration-none text-white ${isBadge && 'badge text-bg-primary p-2 me-2'}`}>{genre.name}</Link>
    );
}

export default GenreLink;