import {api, requestConfig} from "../utils/config"

// Get admin details
const profile = async(data, token) => {
  const config = requestConfig("GET", data, token)

  try {
    const res = await fetch(api + "/admins/profile_admin", config)
      .then((res) => res.json())
      .catch((err) => err)
    
      return res
  } catch (error) {
    console.log(error)
  }
}

// Update admin details
const updateProfile = async(data, token) => {
  const config = requestConfig("PUT", data, token, true)

  try {
    const res = await fetch(api + "/admins/", config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
      console.log(error)
  }
}

// Get admin details
const getAdminDetails = async (id) => {
  const config = requestConfig("GET")

  try {
    const res = await fetch(api + "/admins/" + id, config)
      .then((res) => res.json())
      .catch((err) => err)

    return res
  } catch (error) {
      console.log(error)
  }
}

const adminService = {
  profile,
  updateProfile,
  getAdminDetails,
}

export default adminService  