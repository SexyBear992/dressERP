import baseUrl from '@/api/index.js'
import {request, METHOD} from '@/utils/request'

export const csGet = () => {
	return request(baseUrl.csGet, METHOD.GET)
}
export const login = (params) => {
	return request(baseUrl.LOGIN, METHOD.POST, params)
}
export const getRoutesConfig = () => {
	return request(baseUrl.ROUTES, METHOD.GET)
}