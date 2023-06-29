export interface Props_User extends Props_DataModel {
	username: string;
	profile: string;

	is_staff: boolean;
}

export interface Props_DataModel {
	id: number;
	date_created: string;
}

export interface KeyValue<T> {
	[key: string]: T;
}

export type Some<T> = T | null;
export type Enum = Record<string | number, string | number>;

export type TypedKeyValue<K extends string | number, V> = { [key in K]: V };

export type Complex_Data_Type<T, O> = { type: T; data: O };

export interface SyntheticTarget<T> {
	target: T;
}