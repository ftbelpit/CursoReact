// redux
import { resetMessage } from "../slices/washerSlice";

export const useResetComponentMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }
}