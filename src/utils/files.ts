export type FileType = 'html' | 'css' | 'ts';

export interface File {
	value: string;
	name: string;
	type: FileType;
	editable: boolean;
	visible: boolean;
}
