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
  getAllDataDaily: {
    status: string;
    data: any;
  };
  entries: any;
  activeDay: any;
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
  getAllDataDaily: {
    status: states.BASE,
    data: [],
  },
  entries: [],
  activeDay: [],
};
export const triggerGetAllDataDaily = createAsyncThunk(
  'get-daily-data',
  async (_, thunkAPI) => {
    try {
      return await GeneralService.getAllDataDaily();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get daily data
    builder.addCase(triggerGetAllDataDaily.pending, (state) => {
      state.getAllDataDaily.status = states.LOADING;
      state.getAllDataDaily.data = [];
    });
    builder.addCase(triggerGetAllDataDaily.fulfilled, (state: any, action) => {
      state.getAllDataDaily.status = states.SUCCESSFUL;
      state.getAllDataDaily.data = action.payload;
    });
    builder.addCase(triggerGetAllDataDaily.rejected, (state) => {
      state.getAllDataDaily.status = states.ERROR;
      state.getAllDataDaily.data = [];
    });
  },
});

export default generalSlice.reducer;
export const { setEntries, setActiveDay } = generalSlice.actions;
