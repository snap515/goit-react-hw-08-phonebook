import { useDispatch } from 'react-redux';
import { filteredValue } from '../../redux/filter/filterSlice'
import css from './Filter.module.css'

export const Filter = () => {
  const dispatch = useDispatch();

  const onFilterChange = (e) => {
    const filterValue = e.target.value.trim();
    dispatch(filteredValue(filterValue))
  }
  return (
    <div className={css.filterWrapper}>
      <label className={css.filterLabel} htmlFor="filter">Search</label>
      <input className={css.filterInput}type="text" id="filter" name="filter" onChange={onFilterChange}  placeholder="John" />
    </div>
  )
}