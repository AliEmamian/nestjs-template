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
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    private repository: TagRepository,
  ) { }

  onModuleInit() {}

  getCachekey(): string {
    return 'tag_*';
  }

  public async createTag(payload) {

    try {
      let res = await this.repository.createTag(payload);

      return { data: res, error: null, status: HttpStatus.OK };
    }
    catch (e) {
      console.log(e);

      throw new BadRequestException('invalid INPUT');
    }
  }

  public async getTag() {
    // const cacheKey = this.getCachekey();
    // const cachedData = await this.cacheRepository.get(cacheKey);
    // if (cachedData.check) {
    //   return JSON.parse(cachedData.body);
    // }
    try {
      let res = await this.repository.getMany()
      if (!res)
        throw new BadRequestException('invalid');
     
      // await this.cacheRepository.set(cacheKey, JSON.stringify(res), +process.env.CACHE_TIMEOUT);
      return res
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getFilteredTag(pagination, filter) {
    const result = await this.repository.getFilteredTag(pagination, filter)
    return result;
  }

  public async getTagById(id) {
    // const cacheKey = this.getCachekey();
    // const cachedData = await this.cacheRepository.get(cacheKey);
  
    // if (cachedData?.check) {
    //   const tags = JSON.parse(cachedData.body);
    //   const tag = tags.find((item) => item.id === id);
  
    //   if (tag) {
    //     return tag;
    //   // } else {
    //   //   throw new NotFoundException('id not found in cached data');
    //   }
    // }

    try {
      let res = await this.repository.getOne(id)
      if (!res)
        throw new NotFoundException('id not found');
      return res
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateTagById(id,body) {
    try {
      let Tag = await this.repository.getOne(id)
      if (!Tag)
        throw new NotFoundException('id not found');

      // await this.cacheRepository.delete(this.getCachekey());
      return await this.repository.edit(id,body)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async removeTagById(id) {
    try {
      let Tag = await this.repository.getOne(id)
      if (!Tag)
        throw new NotFoundException('id not found');
      
      // await this.cacheRepository.delete(this.getCachekey());
      return await this.repository.removeById(id)
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

}
