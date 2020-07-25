import IAuthRepository from '../domain/IAuthRepository'
import IPasswordService from '../services/IPasswordService'

export default class SignUpUseCase {
  constructor(
    private authRespository: IAuthRepository,
    private passwordService: IPasswordService
  ) {}

  public async execute(
    name: string,
    authType: string,
    email: string,
    password: string
  ): Promise<string> {
    const user = await this.authRespository.find(email).catch((_) => null)
    if (user) return Promise.reject('User already exists')

    const userId = await this.authRespository.add(
      name,
      email,
      await this.passwordService.hash(password),
      authType
    )
    return userId
  }
}
