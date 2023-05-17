import { uploads } from "../utils/config"

const PhotoItem = ({ car }) => {
  return (
    <div className="photo-item">
      <p className="photo-author">
        {car.fabricante}
      </p>
    </div>
  )
}

export default PhotoItem