import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../../entities/user.entity';
import { encrypt } from '@shared/utils/constant';
import { sendOtpSms } from '@shared/utils/sms';
const crypto = require('crypto');

@Injectable()
export class UserService {
  constructor(
    private repository: UserRepository,
  ) { }

  onModuleInit() {

  }
  public async createUser(payload) {

    try {

      payload.password = this.generateHash(payload.password);

      let invitaionCode = this.getRandomInvitationCode();

      payload.invitaionCode = invitaionCode;

      let res = await this.repository.createUser(payload);
      return { data: res, error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);
      throw new BadRequestException('invalid INPUT');
    }
  }
  public getRandomInvitationCode() {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";

    //specify the length for the new string  
    var lenString = 7; ``
    var randomstring = '';

    //loop to select a new character in each iteration  
    for (var i = 0; i < lenString; i++) {
      var rnum = Math.floor(Math.random() * characters.length);
      randomstring += characters.substring(rnum, rnum + 1);
    }
    return randomstring;
  }

  public async getUser(id: number) {
    try {
      let User = await this.repository.getOne(id)
      if (!User)
        throw new BadRequestException('invalid');
      return User
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getUserByPhone(phone: string) {
    try {
      let User = await this.repository.getOneByPhone(phone)
      if (!User)
        throw new BadRequestException('invalid');
      return User
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getUserByEmail(email: string) {
    try {
      let User = await this.repository.getOneByEmail(email)
      if (!User)
        throw new BadRequestException('invalid');
      return User
    } catch (e) {
      console.log(e);
      throw e;
    }
  }


  public async getUserByNationalCode(email: string) {
    try {
      let User = await this.repository.getOneByNationalCode(email)
      if (!User)
        throw new BadRequestException('invalid');
      return User
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateUser(id: number, body: User, isActive = false) {
    try {
      let user = await this.repository.getOne(id)
      if (!user)
        throw new BadRequestException('invalid');

      if (body.password)
        body.password = this.generateHash(body.password)

      if (isActive)
        body.isActive = true
      else
        body.isActive = user.isActive

      let res = await this.repository.edit(id, body)
      return { error: null, status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      throw e;

    }
  }

  public async getAllUser(queryString) {

    try {
      if (queryString.pageIndex === "" || !queryString.pageIndex) {
        queryString.pageIndex = 0
      }
      if (queryString.pageSize === "" || !queryString.pageSize) {
        queryString.pageSize = 10
      }
      if (queryString.sortColumn === "" || !queryString.sortColumn) {
        queryString.sortColumn = "id"
      }
      if (queryString.sortDesc == "" || !queryString.sortDesc) {
        queryString.sortDesc = true
      }
      let User = await this.repository.getAllUser(queryString)

      if (!User)
        throw new BadRequestException('invalid');
      return User
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async checkUserIsExist(queryString) {
    if (queryString.nationalCode) {      
      let user = await this.repository.getOneByNationalCode(queryString.nationalCode)      
      if (user) return true;
      return false
    }
    else if (queryString.phone) {
      let user = await this.repository.getOneByPhone(queryString.phone)
      if (user) return true;
      return false
    }
    else if (queryString.email) {
      let user = await this.repository.getOneByEmail(queryString.email)
      if (user) return true;
      return false
    }
    else throw new BadRequestException('invalid') 
  }

  public async generateOTP(phone) {
    let user = await this.repository.getOneByPhone(phone)
    let otpCode;
    if (!user && !user.isActive)
      throw new BadRequestException('invalid');
    //if now<expire 
    if (Number(user.expireOtp) > Number(new Date().getTime()))
      throw new BadRequestException('The code request has already arrived!')
    //now < expire+1h  => count ++
    //if(count<=10)send sms else isActive=false and throw error
    else if (Number(new Date().getTime()) < Number(user.expireOtp) + (60 * 60 * 1000))
      otpCode = user.otpCode
    else
      otpCode = Math.floor(Math.random() * 10000);

    let countOtp;
    if (user.countOtp) user.countOtp++;
    else countOtp = 1;
    let expireOtp = new Date().getTime() + (2 * 60 * 1000)
    let res = await this.repository.edit(user.id, { otpCode, expireOtp, countOtp })

    await sendOtpSms(user.phone, otpCode);

    return otpCode;
  }

  public generateHash(password) {
    const cipher = crypto.createCipher(encrypt.algorithm, encrypt.key);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }
}
