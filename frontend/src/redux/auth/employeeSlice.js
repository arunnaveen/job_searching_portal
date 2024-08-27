import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//async thunkfor form submission
export const submitEmployeeForm = createAsyncThunk('employee/submitFormEmployee',
    async(formData,{rejectWithValue}) => {
        try{
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
            }

            const response = await axios.post('http://localhost:5000/api/jobseeker/employee', formData, config);
            return response.data;
        }catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const fetchEmployeeDetails = createAsyncThunk(
    'employee/fetchEmployeeDetails',
    async (_, { rejectWithValue }) => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;
        const response = await axios.get('http://localhost:5000/api/jobseeker/employee', {
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

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
      employeeData: null,
      loading: false,
      error: null,
    },
    reducers: {
      // You can add other synchronous actions here if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(submitEmployeeForm.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(submitEmployeeForm.fulfilled, (state, action) => {
          state.loading = false;
          state.employeeData = action.payload;
          state.error = null;
        })
        .addCase(submitEmployeeForm.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(fetchEmployeeDetails.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchEmployeeDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.details = action.payload;
          })
          .addCase(fetchEmployeeDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    },
  })

  export default employeeSlice.reducer;