import { AuthGuard } from '@modules/auth/auth.guard';
import {
  Controller, Inject, UseInterceptors,
  Post,
  Param,
  Query,
  Body,
  Get,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { TagService } from './tag.service';


@Controller()
export class TagController {

  @Inject(TagService)
  private readonly service: TagService;

  @UseGuards(AuthGuard)
  @Post()
  private async createTag(@Request() req,@Body() payload) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.createTag(payload);
    return res;

  }

  @UseGuards(AuthGuard)
  @Get('')
  private async findTag(@Request() req) {
    
    let res = await this.service.getTag();;
    return res;
  }

  @UseGuards(AuthGuard)
  @Post('filter')
  private async findFilteredTag(
    @Query() pagination,
    @Body() filter,
  ) {
    let res = await this.service.getFilteredTag(pagination,filter);
    return {
      data: res[0],
      details: {
        count: res[1]
      }
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  private async findTagById(@Request() req,@Param('id') id) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.getTagById(id);;
    return res;
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  private async updateTagById(@Request() req,@Param('id') id,@Body() body) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.updateTagById(id,body);;
    return {data:res};
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  private async removeTagById(@Request() req,@Param('id') id) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.removeTagById(id);;
    return res;
  }
}