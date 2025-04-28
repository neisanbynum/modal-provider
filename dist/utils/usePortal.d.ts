import { Closer, Thunk, usePortalValues } from '../types';
import ModalPositioner from './positioner';
declare const usePortal: Thunk<[HTMLElement, Closer, ModalPositioner], usePortalValues>;
export default usePortal;
