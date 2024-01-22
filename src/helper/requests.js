const API_KEY = '0d8ab7cff2692bd014bb25fca16d7158';

export const requests = {
    getCollection: (streamType, endpoint) => `${streamType}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
    getDetails: (req) => { return `${req.type}/${req.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos` },
    getCredits: (streamType, id) => `${streamType}/${id}/credits?api_key=${API_KEY}&language=en-US`,
    getSimilar: (type, id) => { return `/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1` },
    getRecommended: (type, id) => { return `/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1` },
    getWatchProviders: (type, id) => { return `${type}/${id}/watch/providers?api_key=${API_KEY}` },
    getSesaonDetails: (tvId, seasonNumber) => { return `/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US` },
    discoverByRating: (type) => { return `/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&with_networks=213` },
    getByGenre: (id, type) => { return `/discover/${type}?api_key=${API_KEY}&language=en-US&page=1&with_genres=${id}&adult=false` },
    getGenre: (type) => { return `/genre/${type}/list?api_key=${API_KEY}` },
    getSearch: (platform, querystring) => `/search/${platform}?api_key=${API_KEY}&query=${querystring}&language=en-US&page=1`
}

export const streamType = {
    tv: "tv",
    movie: "movie"
}

export const endpoints = {
    popular: "popular",
    upcoming: "upcoming",
    topRated: "top_rated",
    nowPlaying: "now_playing",
    airingToday: "airing_today",
    onTheAir: "on_the_air"
}