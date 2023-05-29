import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import washerService from "../services/washerService";

const initialState = {
  washers: [],
  washer: {},
  error: false,
  success: false,
  loading: false,
  message: null
}

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

// Get user photos
// export const getUserPhotos = createAsyncThunk(
//   "photo/userphotos",
//   async(id, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token

//     const data = await photoService.getUserPhotos(id, token)

//     return data
//   }
// )

// Delete a photo 
// export const deletePhoto = createAsyncThunk(
//   "photo/delete",
//   async(id, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token

//     const data = await photoService.deletePhoto(id, token)

//     // Check for errors
//     if(data.errors) {
//       return thunkAPI.rejectWithValue(data.errors[0])
//     }

//     return data
//   }
// )

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
    const tokenAdmin = thunkAPI.getState().authAdmin.admin.token_admin

    const data = await washerService.getWasher(id, tokenAdmin)

    // Check for errors
    if(data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0])
    }

    return data
  }
)

// like a photo
// export const like = createAsyncThunk(
//   "photo/like",
//   async(id, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token

//     const data = await photoService.like(id, token)

//     // Check for errors
//     if(data.errors) {
//       return thunkAPI.rejectWithValue(data.errors[0])
//     }

//     return data
//   }
// )

// // add comment to a photo
// export const comment = createAsyncThunk(
//   "photo/comment",
//   async(commentData, thunkAPI) => {
//     const token = thunkAPI.getState().auth.user.token

//     const data = await photoService.comment(
//       { comment: commentData.comment }, 
//       commentData.id, 
//       token
//     )

//     // Check for errors
//     if(data.errors) {
//       return thunkAPI.rejectWithValue(data.errors[0])
//     }

//     return data
//   }
// )

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
      state.photo = {}
    })
    // .addCase(getUserPhotos.pending, (state) => {
    //   state.loading = true
    //   state.error = false
    // })
    // .addCase(getUserPhotos.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.success = true
    //   state.error = null
    //   state.photos = action.payload 
    // })
    // .addCase(deletePhoto.pending, (state) => {
    //   state.loading = true
    //   state.error = false
    // })
    // .addCase(deletePhoto.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.success = true
    //   state.error = null

    //   state.photos = state.photos.filter((photo) => {
    //     return photo._id !== action.payload.id
    //   })

    //   state.message = action.payload.message
 
    // })
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
      state.photo = {}
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
    // .addCase(like.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.success = true
    //   state.error = null

    //   if(state.photo.likes) {
    //     state.photo.likes.push(action.payload.userId)
    //   }

    //   state.photos.map((photo) => {
    //     if(photo._id === action.payload.photoId) {
    //       return photo.likes.push(action.payload.userId)
    //     }
    //     return photo  
    //   })
    //   state.message = action.payload.message
 
    // })
    // .addCase(like.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    // })
    // .addCase(comment.fulfilled, (state, action) => {
    //   state.loading = false
    //   state.success = true
    //   state.error = null

    //   state.photo.comments.push(action.payload.comment)

    //   state.message = action.payload.message
 
    // })
    // .addCase(comment.rejected, (state, action) => {
    //   state.loading = false
    //   state.error = action.payload
    // })
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
  }
})

export const { resetMessage } = washerSlice.actions
export default washerSlice.reducer