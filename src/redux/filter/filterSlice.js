import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  //имя слайса
  name: 'filter',
  //начальное состояние редьюсера слайса
  initialState,
  //объект редьюсеров
  reducers: {
    filteredValue(state, action) {
      state.filter = action.payload;
    },
  },
});

//генератор екшенов
export const { filteredValue } = filterSlice.actions;
// редьюсер слайса
export const filterReducer = filterSlice.reducer;
