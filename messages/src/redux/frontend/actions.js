export const SET_LOADING = 'SET_LOADING';
export const SET_LOADING_MESSAGES = 'SET_LOADING_MESSAGES';

export const setLoading = (isLoading) => ({type: SET_LOADING, payload: isLoading});

export const setLoadingMessages = (isLoadingMessages) => ({type: SET_LOADING_MESSAGES, payload: isLoadingMessages});
