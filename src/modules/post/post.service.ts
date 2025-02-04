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
import { PostRepository } from './post.repository';
import { Post } from '../../entities/post.entity';
import { encrypt } from '@shared/utils/constant';
import { sendOtpSms } from '@shared/utils/sms';
const crypto = require('crypto');

@Injectable()
export class PostService {
  constructor(
    private repository: PostRepository,
  ) { }

  onModuleInit() {

  }
  public async createPost(payload) {

    try {

      let res = await this.repository.createPost(payload);
      return { data: res, error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);
      throw new BadRequestException('invalid INPUT');
    }
  }

  public async getPostById(id: number) {
    try {
      let Post = await this.repository.getOne(id)
      if (!Post)
        throw new BadRequestException('invalid');
      return Post
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updatePost(id: number, body: Post, isActive = false) {
    try {
      let user = await this.repository.getOne(id)
      if (!user)
        throw new BadRequestException('invalid');

      let res = await this.repository.edit(id, body)
      return { error: null, status: HttpStatus.OK };
    } catch (e) {
      console.log(e);
      throw e;

    }
  }

  public async getAllPost(queryString) {

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
      let Post = await this.repository.getAllPost(queryString)

      if (!Post)
        throw new BadRequestException('invalid');
      return Post
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async removePostById(id: number) {
    try {
      let Person = await this.repository.getOne(id)
      if (!Person)
        throw new NotFoundException('not found');
      await this.repository.removeById(id)
      return { status: true }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getFilteredPost(pagination, filter) {
    const result = await this.repository.getFilteredPost(pagination, filter)
    return result;
  }

}
