export interface Props_User extends Props_DataModel {
	username: string;
	profile: string;

	is_staff: boolean;
}

export interface Props_DataModel {
	id: number;
	date_created: string;
}
