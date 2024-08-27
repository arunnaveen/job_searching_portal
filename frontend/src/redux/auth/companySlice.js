import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for submitting company details
export const submitCompanyDetails = createAsyncThunk(
  'company/submitCompanyDetails',
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:5000/api/jobprovider/company', formData, config);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for fetching company details
export const fetchCompanyDetails = createAsyncThunk(
  'company/fetchCompanyDetails',
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const response = await axios.get('http://localhost:5000/api/jobprovider/company', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyData: null,    // For storing submitted company data
    details: null,        // For storing fetched company details
    loading: false,       // General loading state
    status: 'idle',       // Status for fetch operation
    error: null,          // Error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling company details submission
    builder
      .addCase(submitCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.companyData = action.payload;
        state.error = null;
      })
      .addCase(submitCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handling company details fetching
    builder
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.details = action.payload;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
