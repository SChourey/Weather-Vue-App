export interface HttpApiRequestInterface {
	url: string
	queryParams?: Record<any, any>
}

export interface HttpApiInterface {
	get<T>(parameters: HttpApiRequestInterface): Promise<T>
}
