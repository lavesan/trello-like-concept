export interface ISelectedComp {
    selected: boolean;
}

export interface ICircleImgComponent extends Partial<ISelectedComp> {
    imgUrl: string;
    className?: string;
}