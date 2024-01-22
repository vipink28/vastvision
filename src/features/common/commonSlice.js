
import axios from '../../helper/axios';
import { requests } from '../../helper/requests';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
  headerVideo: {
    status: "idle",
    data: null,
    error: null
  },
  videoDetails: {
    status: "idle",
    data: null,
    error: null
  },
  type: '',
  queryString: ""
}

// Define your async action creators dynamically
const createAsyncAction = (name) => {
  return createAsyncThunk(`common/${name}`, async (req) => {
    const response = await axios.get(requests.getDetails(req));
    return response.data;
  });
};

// Define your async actions using the dynamic creator
export const fetchHeaderVideo = createAsyncAction("headerVideo");
export const fetchVideoDetails = createAsyncAction("videoDetails");

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    streamTypeAction: (state, action) => {
      state.type = action.payload;
    },
    searchVideo: (state, action) => {
      state.queryString = action.payload
    }
  },
  extraReducers: (builder) => {
    // Use a loop to create reducers dynamically for each async action
    [fetchHeaderVideo, fetchVideoDetails].forEach((asyncAction) => {
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
});

export const { streamTypeAction, searchVideo } = commonSlice.actions;

export const selectHeaderVideo = (state) => state.common.headerVideo;
export const selectVideoDetails = (state) => state.common.videoDetails;
export const selectSearchString = (state) => state.common.queryString;


export default commonSlice.reducer;