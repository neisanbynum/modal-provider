import { Coordinates, ModalOptions, ModalPlacement, Thunk } from '@/types';
export default class ModalPositioner {
    private _root;
    private _modal;
    private _position;
    private _placement;
    private _offset;
    private _margin;
    constructor(placement: ModalPlacement, options?: ModalOptions);
    private set options(value);
    private matchRect;
    position: Thunk<[DOMRect], Coordinates>;
}
