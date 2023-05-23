import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from "../services/adminAuthService";

const admin = JSON.parse(localStorage.getItem("admin"))

const initialState = {
  admin: admin ? admin : null,
  error: false,
  success: false,
  loading: false,
}

// Register an admin and sign in
export const register = createAsyncThunk(
  "authAdmin/register",
  async (admin, thunkAPI) => {
    const data = await adminAuthService.register(admin)

    // check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// Logout an admin
export const logout = createAsyncThunk("authAdmin/logout", async() => {
  await adminAuthService.logout()
})

// Sign in an admin
export const login = createAsyncThunk(
  "authAdmin/login",
  async (admin, thunkAPI) => {
    const data = await adminAuthService.login(admin)

    // check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

export const adminAuthSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false
      state.error = false
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.admin = action.payload
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.admin = null
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.admin = null
    })
    .addCase(login.pending, (state) => {
      state.loading = true
      state.error = false
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.error = null
      state.admin = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
      state.admin = null
    })
  }
})

export const {reset} = adminAuthSlice.actions
export default adminAuthSlice.reducer