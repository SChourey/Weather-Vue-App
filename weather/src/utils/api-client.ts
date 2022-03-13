import {HttpApiInterface, HttpApiRequestInterface} from '@/models/api-client'

import axios, {AxiosRequestConfig, AxiosError, AxiosResponse, AxiosInstance} from 'axios'

const BACKEND_API_URL = process.env.VUE_APP_BASE_API_URL

class ApiClient implements HttpApiInterface {
	apiClientInstance: AxiosInstance
	serverErrorMessage = 'Service unavailable. Please try again later.'

	constructor(baseUrl: string) {
		this.apiClientInstance = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	get<T>(request: HttpApiRequestInterface): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {url, queryParams} = request

			const options: AxiosRequestConfig = {
				headers: {},
				params: queryParams,
			}

			this.apiClientInstance
				.get(url, options)
				.then((response: AxiosResponse) => {
					resolve(response.data as T)
				})
				.catch((response: AxiosError) => {
					reject(response)
				})
		})
	}
}

export const apiClient = new ApiClient(BACKEND_API_URL)
