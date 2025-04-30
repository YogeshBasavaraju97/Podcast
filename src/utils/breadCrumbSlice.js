
import { createSlice } from '@reduxjs/toolkit';

const breadcrumbSlice = createSlice({
  name: 'breadcrumbs',
  initialState: [],
  reducers: {
    setBreadcrumbs: (state, action) => action.payload,
    clearBreadcrumbs: () => [],
  },
});

export const { setBreadcrumbs, clearBreadcrumbs } = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;
