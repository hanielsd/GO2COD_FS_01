import apiService from './http-common'
import { errorHandler } from './httpErrorHandler'

export const http = {
  request: async (payload) => {
    try {
      if (!payload.method) payload.method = 'get'
      // payload = {
      //   headers: {
      //     'X-Parse-Application-Id': 'J7cUIahYbgULhrbajGcScaAIRejvvIcYnUZSJ9B6',
      //     'X-Parse-REST-API-Key': 'mqFlf6ANYZtWfaRP31oMqrG1tn4FPiiC8BfovYN8',
      //   },
      //   ...payload,
      // }
      const response = await apiService.request(payload)
      return response ? response.data : response
    } catch (error) {
      const errorModified = errorHandler(error)
      return { isError: true, error: errorModified }
    }
  },
  upload: async (payload) => {
    payload = {
      ...payload,
      headers: { 'Content-Type': 'multipart/form-data' },
    }
    try {
      const response = await apiService.request(payload)
      return response ? response.data : response
    } catch (error) {
      const errorModified = errorHandler(error)
      return { isError: true, error: errorModified }
    }
  },
  download: async (payload) => {
    payload = {
      ...payload,
      responseType: 'blob',
    }
    try {
      const response = await apiService.request(payload)
      return response ? response.data : response
    } catch (error) {
      const errorModified = errorHandler(error)
      return { isError: true, error: errorModified }
    }
  },
}
