import "./Washer.css"

// import { uploads } from "../../utils/config"

// components
import Message from "../../components/Message"
// import { Link } from "react-router-dom"
// import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs"

// hooks
import { useState, 
  // useEffect, 
  useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { useParams } from "react-router-dom"

// redux
// import { getUserDetails } from "../../slices/userSlice"
import { insertWasher, resetMessage } from "../../slices/washerSlice"

const Washer = () => {
  // const { id } = useParams()

  const dispatch = useDispatch()

  const { 
    // admin, 
    loading 
  } = useSelector((state) => state.admin)
  // const { admin: adminAuth } = useSelector((state) => state.authAdmin)
  const { 
    // washers, 
    loading: loadingWasher, 
    message: messageWasher, 
    error: errorWasher
  } = useSelector((state) => state.washer) 

  const [name, setName] = useState("")
  const [score, setScore] = useState("")
  const [assessments, setAssessments] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")

  // const [editId, setEditId] = useState("")
  // const [editImage, setEditImage] = useState("")
  // const [editTitle, setEditTitle] = useState("")

  // New form and edit form refs
  const newWasherForm = useRef()
  // const editPhotoForm = useRef()

  // load user data
  // useEffect(() => {
  //   dispatch(getUserDetails(id))
  //   dispatch(getUserPhotos(id))
  // }, [dispatch, id])

  const handleFile = (e) => {
    const image = e.target.files[0]

    setImage(image)
  }

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  const submitHandle = (e) => {
    e.preventDefault()

    const washerData = {
      name,
      score,
      assessments,
      price, 
      image
    }

    // build form data
    const formData = new FormData()

    const washerFormData = Object.keys(washerData).forEach((key) => 
      formData.append(key, washerData[key])
    )

    formData.append("washer",  washerFormData)

    dispatch(insertWasher(formData))

    setName("")
    setScore("")
    setAssessments("")
    setPrice("")

    resetComponentMessage()
  } 

  // Delete a photo
  // const handleDelete = (id) => {
  //   dispatch(deletePhoto(id))

  //   resetComponentMessage()
  // }

  // Show or hide forms
  // const hideOrShowForms = () => {
  //   newPhotoForm.current.classList.toggle("hide")
  //   // editPhotoForm.current.classList.toggle("hide")
  // }

  // Update a photo
  // const handleUpdate = (e) => {
  //   e.preventDefault()

  //   const washerData = {
  //     name: editName,
  //     title: editTitle,
  //     title: editTitle,
  //     title: editTitle,
  //     id: editId,
  //   }
  //   dispatch(updatePhoto(photoData))

  //   resetComponentMessage()
  // }

  // Open edit form
  // const handleEdit = (photo) => {
  //   if(editPhotoForm.current.classList.contains("hide")) {
  //     hideOrShowForms()
  //   }

  //   setEditId(photo._id)
  //   setEditTitle(photo.title)
  //   setEditImage(photo.image)
  // }

  // const handleCancelEdit = (e) => {
  //   hideOrShowForms()
  // }

  if(loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="data-car">
      <div className="profile-title">
        <h2>Cadastrar lavador</h2>
      </div>
      <div ref={newWasherForm}>
        <form id="carForm" onSubmit={submitHandle}>
          <div className="data-card">
            <label>Imagem</label>
            <input 
              type="file" 
              onChange={handleFile} 
            />
            <label>Nome</label>
            <input
              type="text"
              placeholder="Insira o nome"
              onChange={(e) => setName(e.target.value)}
              value={name || ""}
            />

            <label>Nota</label>
            <input
              type="text"
              placeholder="Insira a nota de 0 a 5"
              onChange={(e) => setScore(e.target.value)}
              value={score || ""}
            />

            <label>Avaliações</label>
            <input
              type="text"
              placeholder="Insira a quantidade de avaliações"
              onChange={(e) => setAssessments(e.target.value)}
              value={assessments || ""}
            />
            <label>Preço</label>
            <input
              type="text"
              placeholder="Insira um preço"
              onChange={(e) => setPrice(e.target.value)}
              value={price || ""}
            />
          </div>
          <div className="add-button">
          {!loadingWasher && <input type="submit" value="Cadastrar" />}
          {loadingWasher && (
            <input type="submit" disabled value="Aguarde..." />              
          )}
          </div>
        </form>
      </div>
      {errorWasher && <Message msg={errorWasher} type="error"/>}
      {messageWasher && <Message msg={messageWasher} type="success"/>}   
    </div>
  )
}

export default Washer