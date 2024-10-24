import { mockAPiService } from '@integration/MockAPiService';
import createStore from '@domain/features/store';

// just plug the mock dependencies to get temporary store
const temporaryStore = createStore(mockAPiService);
export type RootState = ReturnType<typeof temporaryStore.getState>;
export type AppDispatch = typeof temporaryStore.dispatch;
