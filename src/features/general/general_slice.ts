import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GeneralService from './general_service';
import * as states from '../../utils/strings';
interface IinitialState {
  getAllDataDaily: {
    status: string;
    data: any;
  };
  entries: any;
  activeDay: any;
  getAllDataMonthly: {
    status: string;
    data: any;
  };
  entriesMonthly: any;
  activeMonth: any;
}
const initialState: IinitialState = {
  getAllDataDaily: {
    status: states.BASE,
    data: [],
  },
  entries: [],
  activeDay: [],
  getAllDataMonthly: {
    status: states.BASE,
    data: [],
  },
  entriesMonthly: [],
  activeMonth: [],
};
export const triggerGetAllDataDaily = createAsyncThunk(
  'get-all-data-daily',
  async (_, thunkAPI) => {
    try {
      return await GeneralService.getAllDataDaily();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const triggerGetAllDataMonthly = createAsyncThunk(
  'get-all-data-monthly',
  async (_, thunkAPI) => {
    try {
      return await GeneralService.getAllDataMonthly();
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
    setEntriesMonthly: (state, action) => {
      state.entriesMonthly = action.payload;
    },
    setActiveMonth: (state, action) => {
      state.activeMonth = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get all data daily
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
    //get all data monthly
    builder.addCase(triggerGetAllDataMonthly.pending, (state) => {
      state.getAllDataMonthly.status = states.LOADING;
      state.getAllDataMonthly.data = [];
    });
    builder.addCase(
      triggerGetAllDataMonthly.fulfilled,
      (state: any, action) => {
        state.getAllDataMonthly.status = states.SUCCESSFUL;
        state.getAllDataMonthly.data = action.payload;
      }
    );
    builder.addCase(triggerGetAllDataMonthly.rejected, (state) => {
      state.getAllDataMonthly.status = states.ERROR;
      state.getAllDataMonthly.data = [];
    });
  },
});

export default generalSlice.reducer;
export const { setEntries, setActiveDay, setEntriesMonthly, setActiveMonth } =
  generalSlice.actions;
