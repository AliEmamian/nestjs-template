import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Body,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  Headers,
  BadRequestException,
  UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { encrypt } from '@shared/utils/constant';
const crypto = require('crypto');

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Headers('apikey') apikey, @Body() signInDto: Record<string, any>) {
    console.log(signInDto);
    
  
    const cipher = crypto.createCipher(encrypt.algorithm, encrypt.key);
    let encrypted = cipher.update(signInDto.password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    signInDto.password = encrypted;
    if (signInDto.phone) {
      let res = await this.authService.signInwithPhone(signInDto.phone, signInDto.password, signInDto.mac);
     

      return res
    }
    else if (signInDto.nationalCode) {
      let res = await this.authService.signInwithNationalCode(signInDto.nationalCode, signInDto.password);
      

      return res
    }
    else if (signInDto.email) {
      let res = await this.authService.signInwithEmail(signInDto.email, signInDto.password);
     

      return res
    }
    throw new UnauthorizedException()
  }

  @Post('loginOTP')
  signInOTP(@Body() signInDto: Record<string, any>) {
    console.log('loginWithOTP', signInDto);
    return this.authService.signInOTP(signInDto.phone, signInDto.otpCode);
  }


  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}