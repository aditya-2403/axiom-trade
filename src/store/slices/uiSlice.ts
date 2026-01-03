import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  activeTab: 'new' | 'final-stretch' | 'migrated' | 'all';
  isModalOpen: boolean;
  isDarkMode: boolean;
  viewMode: 'table' | 'grid';
}

const initialState: UIState = {
  activeTab: 'all',
  isModalOpen: false,
  isDarkMode: true,
  viewMode: 'table',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<UIState['activeTab']>) => {
      state.activeTab = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setViewMode: (state, action: PayloadAction<UIState['viewMode']>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setActiveTab, toggleModal, toggleTheme, setViewMode } = uiSlice.actions;
export default uiSlice.reducer;