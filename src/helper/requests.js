const API_KEY = '0d8ab7cff2692bd014bb25fca16d7158';

export const requests={
    getCollection:(streamType, endpoint)=>`${streamType}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
    getDetails: (req)=>{return `${req.type}/${req.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`},
}

export const streamType = {
    tv:"tv",
    movie: "movie"
}

export const endpoints = {
    popular:"popular",
    upcoming: "upcoming",
    topRated: "top_rated",
    nowPlaying: "now_playing",
    airingToday: "airing_today",
    onTheAir: "on_the_air"
}