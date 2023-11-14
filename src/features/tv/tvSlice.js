import { endpoints, platform, requests } from "../../helper/requests";
import axios from '../../helper/axios';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState={
    popularShows:{
        status: "idle",
        data: null,
        error: null
    },
    topRatedShows:{
        status: "idle",
        data: null,
        error: null
    },
    onTheAirShows:{
        status: "idle",
        data: null,
        error: null
    },
    airingTodayShows:{
        status: "idle",
        data: null,
        error: null
    }
}

// Define your async action creators dynamically
const createAsyncAction = (name, requestFn) => {
    return createAsyncThunk(`tv/${name}`, async () => {
      const response = await axios.get(requestFn);
      return response.data;
    });
  };
  
  // Define your async actions using the dynamic creator
  export const fetchPopularShows = createAsyncAction("popularShows", requests.getCollection(platform.tv, endpoints.popular));
  export const fetchTopRatedShows = createAsyncAction("topRatedShows", requests.getCollection(platform.tv, endpoints.topRated));
  export const fetchAiringTodayShows = createAsyncAction("onTheAirShows", requests.getCollection(platform.tv, endpoints.airingToday));
  export const fetchOnTheAirShows = createAsyncAction("airingTodayShows", requests.getCollection(platform.tv, endpoints.onTheAir));

const tvSlice = createSlice({
    name:"tv",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // Use a loop to create reducers dynamically for each async action
        [fetchPopularShows, fetchTopRatedShows, fetchOnTheAirShows, fetchAiringTodayShows].forEach((asyncAction) => {
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

export default tvSlice.reducer;