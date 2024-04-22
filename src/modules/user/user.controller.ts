import { AuthGuard } from '@modules/auth/auth.guard';
import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Query,
  Body,
  Get,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';


@Controller()
export class UserController {

  @Inject(UserService)
  private readonly service: UserService;

  @Post()
  private async createUser(@Body() payload) { 
    console.log('in controller', payload);
    let res = await this.service.createUser(payload);
    return res;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  private async findUser(@Param('id') id, @Request() req) {
    console.log('in controller', id, req.user);
    if (req.user.userId != id) {
      throw new UnauthorizedException()
    }
    let res = await this.service.getUser(id);;
    return res;
  }

  @Get('/check/exist')
  private async checkUser(@Query() input) {
    return { data: await this.service.checkUserIsExist(input) };
  }

  @UseGuards(AuthGuard)
  @Get('')
  private async findAllUser(@Query() queryString, @Request() req) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.getAllUser(queryString);

    return {
      data: res[0],
      details: {
        count: res[1]
      }
    };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  private async updateUser(
    @Param('id') id,
    @Request() req,
    @Body() body,
  ) {
    console.log('in controller', req.user);
    if (req.user.role == 'user' && req.user.userId != id) {
      throw new UnauthorizedException()
    }
    let res = await this.service.updateUser(id, body);;
    return res;
  }

  @Get('/generateOtp/:phone')
  private async generateOTP(@Param('phone') phone) {

    let res = await this.service.generateOTP(phone);;
    return res;

  }
}