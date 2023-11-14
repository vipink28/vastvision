import { endpoints, streamType, requests } from "../../helper/requests";
import axios from '../../helper/axios';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState={
    popularMovies:{
        status: "idle",
        data: null,
        error: null
    },
    topRatedMovies:{
        status: "idle",
        data: null,
        error: null
    },
    upcomingMovies:{
        status: "idle",
        data: null,
        error: null
    },
    nowPlayingMovies:{
        status: "idle",
        data: null,
        error: null
    }
}

// Define your async action creators dynamically
const createAsyncAction = (name, requestFn) => {
    return createAsyncThunk(`movie/${name}`, async () => {
      const response = await axios.get(requestFn);
      return response.data;
    });
  };
  
  // Define your async actions using the dynamic creator
  export const fetchPopularMovies = createAsyncAction("popularMovies", requests.getCollection(streamType.movie, endpoints.popular));
  export const fetchTopRatedMovies = createAsyncAction("topRatedMovies", requests.getCollection(streamType.movie, endpoints.topRated));
  export const fetchUpcomingMovies = createAsyncAction("upcomingMovies", requests.getCollection(streamType.movie, endpoints.upcoming));
  export const fetchNowPlayingMovies = createAsyncAction("nowPlayingMovies", requests.getCollection(streamType.movie, endpoints.nowPlaying));

const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // Use a loop to create reducers dynamically for each async action
        [fetchPopularMovies, fetchTopRatedMovies, fetchNowPlayingMovies, fetchUpcomingMovies].forEach((asyncAction) => {
          builder
            .addCase(asyncAction.pending, (state) => {
              const key = asyncAction.typePrefix.split("/")[1];
              state[key].status = "loading";
            })
            .addCase(asyncAction.fulfilled, (state, action) => {
              const key = asyncAction.typePrefix.split("/")[1];
              state[key].status = "success";
              state[key].data = action.payload;
            })
            .addCase(asyncAction.rejected, (state, action) => {
              const key = asyncAction.typePrefix.split("/")[1];
              state[key].status = "failed";
              state[key].error = action.error.message;
            });
        });
      },
})

export const selectPopularMovies = (state) => state.movie.popularMovies;
export const selectUpcomingMovies = (state) => state.movie.upcomingMovies;
export const selectNowPlayingMovies = (state) => state.movie.nowPlayingMovies;
export const selectTopRatedMovies = (state) => state.movie.topRatedMovies;

export default movieSlice.reducer;