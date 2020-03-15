import { Service, Inject } from 'typedi';
import { IUser, IUserDTO } from '../interfaces/IUser';
import user from '../api/routes/user';


@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel : Models.UserModel,
    @Inject('logger') private logger,
) {}

  public async CreateUser(userInputDTO: IUserDTO): Promise<{ user: IUser }> {
    try {
      const hashedPassword = 'secureHashedPassword';
      this.logger.silly('Creating user db record');
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        password: hashedPassword
      });
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      return user;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  public async GetRandomUser(): Promise<IUser> {
    const userRecord = await this.userModel.findOne({}, {_id: 0, __v: 0}).exec();
    this.logger.silly(`userRecord: ${userRecord}`)
    return userRecord.toObject();
  }
}
