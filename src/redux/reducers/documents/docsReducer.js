import { GET_ALL_DOCS, GET_DOC } from "../../actions/documents/docsActions"

const initialState = {
  docs: [],
  doc: [],
}

export const docsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOCS:
      return { ...state, docs: payload }
    case GET_DOC:
      return { ...state, doc: payload }
    default:
      return state; // Add a default case to return the state as is
  }
}