import { configureStore } from '@reduxjs/toolkit'
import previewReducer from '../features/state'

export default configureStore({
  reducer: {
    preview: previewReducer
  }
})