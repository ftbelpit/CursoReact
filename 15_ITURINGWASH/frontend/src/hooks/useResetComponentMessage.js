// redux
import { resetMessage } from "../slices/carSlice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }
}