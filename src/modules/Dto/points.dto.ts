export interface PointDto {
	id_point: number;
	
	name: string;

	smallDescription: string;

	mainDescription: string;

	lat: number;

	lon: number;

	QrCode: string;
}

export interface NamePointDto{
	id_point: number;
	
	name: string;
}