import React from 'react'

export default React.createContext({
  days: [],
  dishes: [],
  assignments: [],
  reset: () => {},
  deleteItem: () => {},
  addItem: () => {},
  addAssignment: () => {},
  setDuplicateError: () => {},
  error: "",
})