import { api, requestConfig } from "../utils/config";

// Insert an washer
const insertWasher = async(data, token_admin) => {
  const config = requestConfig("POST", data, token_admin, true)

  try {
    const res = await fetch(api + "/washers", config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// // Get user photos
// const getUserPhotos = async(id, token) => {
//   const config = requestConfig("GET", null, token)
  
//   try {
//     const res = await fetch(api + "/photos/user/" + id, config)
//       .then((res) => res.json())
//       .catch((err) => err)

//     return res
//   } catch (error) {
//     console.log(error)
//   }
// }

// Delete a photo
// const deletePhoto = async(id, token) => {
//   const config = requestConfig("DELETE", null, token)

//   try {
//     const res = await fetch(api + "/photos/" + id, config)
//       .then((res) => res.json())
//       .catch((err) => err)

//     return res
//   } catch (error) {
//     console.log(error)
//   }
// }

// Update an washer
const updateWasher = async (data, id, token_admin) => {
  const config = requestConfig("PUT", data, token_admin)

  try {
    const res = await fetch(api + "/washers/" + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// get a washer by id
const getWasher = async (id, token_admin) => {
  const config = requestConfig("GET", null, token_admin)

  try {
    const res = await fetch(api + "/washers/" + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// like a photo
// const like = async(id, token) => {
//   const config = requestConfig("PUT", null, token)

//   try {
//     const res = await fetch(api + "/photos/like/" + id, config)
//       .then((res) => res.json())
//       .catch((err) => err)
    
//     return res
//   } catch (error) {
//     console.log(error)
//   }
// }

// // add comment to a photo
// const comment = async(data, id, token) => {
//   const config = requestConfig("PUT", data, token)

//   try {
//     const res = await fetch(api + "/photos/comment/" + id, config)
//       .then((res) => res.json())
//       .catch((err) => err)

//     return res
//   } catch (error) {
//     console.log(error)
//   }
// }

// Get all washers
const getWashers = async(token_admin) => {
  const config = requestConfig("GET", null, token_admin)

  try {
    const res = await fetch(api + "/washers", config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

// search washer by name
const searchWashers = async(query, token_admin) => {
  const config = requestConfig("GET", null, token_admin)

  try {
    const res = await fetch(api + "/washers/search?q=" + query, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
    console.log(error)
  }
}

const washerService = {
  insertWasher,
  // getUserPhotos,
  // deletePhoto,
  updateWasher,
  getWasher,
  // like,
  // comment,
  getWashers,
  searchWashers
}

export default washerService