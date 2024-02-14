import { getDocs, /* getDoc */ } from "../../../api";
import { setOperationResult, setAlertMsg, setAlertOpen, setAlertType } from '../../appRedux';

export const GET_ALL_DOCS = 'GET_ALL_DOCS'
export const GET_DOC = 'GET_DOC';

// Actions creator
const getDocsAction = (docs) => ({type: GET_ALL_DOCS, payload: docs});
// const getDocAction = (doc) => ({ type: GET_DOC, payload: doc } );

// Async actions
export const allDocs = () => {
  return async dispatch => {
    try {
      const docs = await getDocs()
      if(docs.statusCode === 200 && docs.status==='ok')
        dispatch(getDocsAction(docs.data))
    } catch(err) {
      console.log(err)
    }
  }
}

/* export const getDocId = (id) => {
  return async dispatch => {
    try {
      const doc = await getDoc(id)
      dispatch(getDocAction(doc.data))
    } catch(err) {
      console.log(err)
    }
  }
}
 */