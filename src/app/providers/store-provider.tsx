import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer } from 'redux-form'

const rootReducer = combineReducers({
  form: reducer
})

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true
  })

  return store
}
export const appStore = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof appStore.dispatch
