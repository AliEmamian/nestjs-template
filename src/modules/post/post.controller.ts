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
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';


@Controller()
export class PostController {

  @Inject(PostService)
  private readonly service: PostService;

  @UseGuards(AuthGuard)
  @Post()
  private async createPost(@Body() payload:CreatePostDto) { 
    let res = await this.service.createPost(payload);
    return res;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  private async findPost(@Param('id') id, @Request() req) {
    let res = await this.service.getPostById(id);;
    return res;
  }

  @UseGuards(AuthGuard)
  @Get('')
  private async findAllPost(@Query() queryString, @Request() req) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.getAllPost(queryString);

    return {
      data: res[0],
      details: {
        count: res[1]
      }
    };
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  private async updatePost(
    @Param('id') id,
    @Request() req,
    @Body() body,
  ) {
    if (req.user.role != 'admin') {
      throw new UnauthorizedException('token admin required!')
    }
    let res = await this.service.updatePost(id, body);;
    return res;
  }


  @UseGuards(AuthGuard)
  @Post('filter')
  private async findFilteredPost(
    @Query() pagination,
    @Body() filter,
  ) {
    let res = await this.service.getFilteredPost(pagination,filter);
    return {
      data: res[0],
      details: {
        count: res[1]
      }
    };
  }


  @UseGuards(AuthGuard)
  @Delete(':id')
  private async removePersonById(
    @Param('id') id,
    @Request() req,
  ) {
    if (req.user.role == 'user' ) {
      throw new UnauthorizedException()
    }
    return this.service.removePostById(id);;
  }
}