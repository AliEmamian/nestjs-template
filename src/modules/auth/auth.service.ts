import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { sendOtpSms } from '@shared/utils/sms';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async signInwithPhone(phone, pass, mac?) {
    const user = await this.userService.getUserByPhone(phone);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    if (mac && user.mac !== mac) {
      
      let otpCode = Math.floor(Math.random() * 10000);
      let expireOtp = (new Date().getTime() + (5 * 60 * 1000)).toString()
      user.otpCode = otpCode
      user.expireOtp = expireOtp

      await this.userService.updateUser(user.id, user)
      await sendOtpSms(phone, otpCode)
      return { status:300 ,message: "otp required!" }
    }
    const payload = { role: user.role, userId: user.id, isActive: user.isActive };
    console.log('payload', payload)
    return {
      authToken: await this.jwtService.signAsync(payload),
      userId:user.id
    };
  }

  async signInwithEmail(email, pass) {
    const user = await this.userService.getUserByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
  
    const payload = { role: user.role, userId: user.id, isActive: user.isActive };
    console.log('payload', payload)
    return {
      authToken: await this.jwtService.signAsync(payload),
      userId:user.id
    };
  }

  async signInwithNationalCode(nationalCode, pass) {
    const user = await this.userService.getUserByNationalCode(nationalCode);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
  
    const payload = { role: user.role, userId: user.id, isActive: user.isActive };
    console.log('payload', payload)
    return {
      authToken: await this.jwtService.signAsync(payload),
      userId:user.id
    };
  }


  async signInOTP(phone, otp) {
    const user = await this.userService.getUserByPhone(phone);
    let now = new Date().getTime()

    if (Number(now) > Number(user.expireOtp))
      throw new UnauthorizedException('Time Exceed');
    if (user?.otpCode !== otp) {
      throw new UnauthorizedException();
    }
    const payload = { role: user.role, userId: user.id, isActive: user.isActive };
    return {
      authToken: await this.jwtService.signAsync(payload),
      userId:user.id
    };
  }

}
