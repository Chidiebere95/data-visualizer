import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GeneralService from './general_service';
import * as states from '../../utils/strings';
interface IinitialState {
  getAllTokens: {
    status: string;
    data: Array<any>;
  };
  getTokenDetails: {
    status: string;
    data: any;
  };
}
const initialState: IinitialState = {
  getAllTokens: {
    status: states.BASE,
    data: [],
  },
  getTokenDetails: {
    status: states.BASE,
    data: [],
  },
};
export const triggerGetAllTokens = createAsyncThunk(
  'get-all-tokens',
  async (_, thunkAPI) => {
    try {
      return await GeneralService.getAllTokens();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetTokenDetails = createAsyncThunk(
  'get-token-details',
  async (params: any, thunkAPI) => {
    try {
      return await GeneralService.getTokenDetails(params);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    resetGetTokenDetails: (state) => {
      state.getTokenDetails = initialState.getTokenDetails;
    },
  },
  extraReducers: (builder) => {
    //get all tokens
    builder.addCase(triggerGetAllTokens.pending, (state) => {
      state.getAllTokens.status = states.LOADING;
      state.getAllTokens.data = [];
    });
    builder.addCase(triggerGetAllTokens.fulfilled, (state, action) => {
      state.getAllTokens.status = states.SUCCESSFUL;
      state.getAllTokens.data = action.payload;
    });
    builder.addCase(triggerGetAllTokens.rejected, (state) => {
      state.getAllTokens.status = states.ERROR;
      state.getAllTokens.data = [];
    });
    //get token details
    builder.addCase(triggerGetTokenDetails.pending, (state) => {
      state.getTokenDetails.status = states.LOADING;
      state.getTokenDetails.data = [];
    });
    builder.addCase(triggerGetTokenDetails.fulfilled, (state: any, action) => {
      state.getTokenDetails.status = states.SUCCESSFUL;
      state.getTokenDetails.data = action.payload;
    });
    builder.addCase(triggerGetTokenDetails.rejected, (state) => {
      state.getTokenDetails.status = states.ERROR;
      state.getTokenDetails.data = [];
    });
  },
});

export default generalSlice.reducer;
export const { resetGetTokenDetails } = generalSlice.actions;
