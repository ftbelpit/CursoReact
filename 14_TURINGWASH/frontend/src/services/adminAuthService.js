import {api, requestConfig} from "../utils/config"

// // Register an admin
// const register = async(data) => {
//   const config = requestConfig("POST", data)

//   try {
//     const res = await fetch(api + "/admins/register", config)
//       .then((res) => res.json())
//       .catch((err) => err)

//     if(res._id) {
//       localStorage.setItem("admin", JSON.stringify(res))
//     }

//     return res
//   } catch (error) {
//     console.log(error)
//   }
// }

// Logout an admin 
const logout = () => {
  localStorage.removeItem("admin")
}

// Sign in an admin
const login = async(data) => {
  const config = requestConfig("POST", data)

  try {
    const res = await fetch(api + "/admins/login", config)
      .then((res) => res.json())
      .catch((err) => err)

    if(res._id) {
      localStorage.setItem("admin", JSON.stringify(res))
    }

    return res
  } catch (error) {
    console.log(error)
  }
}

const adminAuthService = {
  // register,
  logout,
  login
}

export default adminAuthService