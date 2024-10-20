import apiService from './http-common'
import { tokenService } from '../storageService'

const auth = {
  async signIn(payload) {
    try {
      const {
        data: { token, ...user },
      } = await apiService.request(payload)
      tokenService.saveToken(token)
      apiService.setHeader()

      return { isError: false, user }
    } catch (err) {
      return { isError: true, error: err }
    }
  },
  signOut() {
    apiService.removeHeader()
    tokenService.removeToken()
  },
}
export default auth
