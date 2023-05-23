import { createSlice, createAsyncThunk} from "@reduxjs/toolkit"

import adminService from "../services/adminService"

const initialState = {
  admin: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

// Get admin details
export const profile = createAsyncThunk(
  "admin/profile",
  async(admin, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token

    const data = await adminService.profile(admin, token)
    
    return data
  }
) 

// Update admin details
export const updateProfile = createAsyncThunk(
  "admin/update",
  async(admin, thunkAPI) => {
    const token = thunkAPI.getState().auth.admin.token
    
    const data = await adminService.updateProfile(admin, token)

    // Check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Get admin details
export const getAdminDetails = createAsyncThunk(
  "admin/get",
  async(id, thunkAPI) => {
    const data = await adminService.getAdminDetails(id)

    return data
  }
)

export const adminSlice = createSlice({
  name: "admin", 
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(profile.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(profile.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.admin = action.payload
    })
    .addCase(updateProfile.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.admin = action.payload
      state.message = "Administrador atuzaliado com sucesso!"
    })
    .addCase(updateProfile.rejected, (state, action) => {
      console.log(state, action)
      state.loading = false
      state.error = action.payload
      state.admin = {}
    })
    .addCase(getAdminDetails.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(getAdminDetails.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.admin = action.payload
    })
  }
}) 

export const {resetMessage} = adminSlice.actions
export default adminSlice.reducer