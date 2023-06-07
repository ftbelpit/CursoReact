import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import washerService from "../services/washerService";

const initialState = {
  washers: [],
  washer: {},
  error: false,
  success: false,
  loading: false,
  message: null,
}

export const chooseWasher = createAsyncThunk(
  "washer/choose",
  async (washerId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await washerService.getWasher(washerId, token);

    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

// Insert washer
export const insertWasher = createAsyncThunk(
  "washer/insert",
  async(washer, thunkAPI) => {
    const tokenAdmin = thunkAPI.getState().authAdmin.admin.token_admin

    const data = await washerService.insertWasher(washer, tokenAdmin)

    // Check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Update an washer
export const updateWasher = createAsyncThunk(
  "washer/update",
  async (washerData, thunkAPI) => {
    const tokenAdmin = thunkAPI.getState().authAdmin.admin.token_admin

    const data = await washerService.updateWasher(
      { 
        name: washerData.name,
        price: washerData.price
      }, 
      washerData.id, 
      tokenAdmin
    )

    // Check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

export const getWasher = createAsyncThunk(
  "washer/getwasher",
  async(id, thunkAPI) => {

    const data = await washerService.getWasher(id)

    // Check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// get all washers
export const getWashers = createAsyncThunk(
  "washer/getall", 
  async(_, thunkAPI) => {
    const data = await washerService.getWashers()

    return data 
})

// search washer by name
export const searchWashers = createAsyncThunk(
  "washer/search",
  async(query, thunkAPI) => {
    const tokenAdmin = thunkAPI.getState().authAdmin.admin.token_admin

    const data = await washerService.searchWashers(query, tokenAdmin)

    return data  
  }
)

// add assessment to a washer
export const assessment = createAsyncThunk(
  "washer/assessments",
  async(assessmentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token

    const data = await washerService.assessment(
      { 
        score: assessmentData.score,
        assessment: assessmentData.assessment 
      }, 
      assessmentData.id, 
      token
    )

    // Check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

export const washerSlice = createSlice({
  name: "washer",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(insertWasher.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(insertWasher.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.washer = action.payload
      state.washers.unshift(state.washer)
      state.message = "Lavador cadastrado com sucesso!" 
    })
    .addCase(insertWasher.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.wash = {}
    })
    .addCase(updateWasher.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(updateWasher.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.washers.map((washer) => {
        if (washer._id === action.payload.washer._id) {
          return {
            ...washer,
            name: action.payload.washer.name,
            price: action.payload.washer.price
          };
        }
        return washer;
      });
      state.message = action.payload.message
 
    })
    .addCase(updateWasher.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.washer = {}
    })
    .addCase(getWasher.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(getWasher.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.washer = action.payload 
    })
    .addCase(getWashers.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(getWashers.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.washers = action.payload 
    })
    .addCase(getWashers.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.washer = {}
    })
    .addCase(searchWashers.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(searchWashers.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.washers = action.payload 
    })
    .addCase(assessment.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
    
      state.washer.assessments.push({
        score: action.payload.score,
        assessment: action.payload.assessment
      });
    
      state.message = action.payload.message;
    })    
    .addCase(assessment.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { resetMessage } = washerSlice.actions
export default washerSlice.reducer