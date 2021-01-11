import { setErrorMessage } from './shared.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  })
);

export function SharedReducer(state, action) {
  return _sharedReducer(state, action);
}
