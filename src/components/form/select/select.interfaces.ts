interface IOption {
    key: string;
    value: string;
    text: string;
    [key: string]: any;
}

export interface ISelectComponent {
    options: IOption[];
}