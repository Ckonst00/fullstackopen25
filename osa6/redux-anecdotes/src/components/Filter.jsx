import { useDispatch } from "react-redux"
import { filterOnChange } from "../reducers/filterReducer"

const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const filterInput = event.target.value
    dispatch(filterOnChange(filterInput))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  )
}

export default Filter