import { Post } from '../../entities/post.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PostRepository extends Repository<Post> {
  constructor(private readonly dataSource: DataSource) {
    super(Post, dataSource.createEntityManager());
  }

  async createPost(payload) {
    try {
      let res = await this.save(payload)
      return res.id;
    }
    catch (e) {
      console.log(e);

      throw e;
    }
  }
 
  async removeById(id){
    const Person = await this.getOne(id)
    return await this.remove(Person);
  }

  async getFilteredPost(pagination, filters) {
    const { pageSize = 10, pageIndex = 0, sortColumn = 'id', sortDesc = 'false' } = pagination;
    const Person = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);
    
    this.applyFilters(Person, filters);

    return await Person
      .select(columns.map(column => `p.${column}`))
      .skip(pageSize * pageIndex)
      .take(pageSize)
      .orderBy(sortColumn, sortDesc === 'true' ? 'DESC' : 'ASC')
      .getManyAndCount();

      // console.log('results, total: ', results, total);
    // return [results, total];
  }

  private applyFilters(queryBuilder: any, filters: any): void {
    if (filters.type) {
      queryBuilder.andWhere(`p.type ILIKE :type`, { type: `%${filters.type}%` });
    }
  
    if (filters.tags) {
      const tagsArray = Array.isArray(filters.tags) ? filters.tags : [filters.tags];
      tagsArray.forEach(tag => {
        queryBuilder.andWhere(`p."tags" @> :tag`, { tag: `{"${tag}"}` });
      });
    }

    if (filters.title) {
      if (filters.title.fa) {
        queryBuilder.andWhere(`p.title ->> 'fa' ILIKE :faName`, { faName: `%${filters.title.fa}%` });
      }
      if (filters.title.en) {
        queryBuilder.andWhere(`p.title ->> 'en' ILIKE :enName`, { enName: `%${filters.title.en}%` });
      }
      if (filters.title.ar) {
        queryBuilder.andWhere(`p.title ->> 'ar' ILIKE :arName`, { arName: `%${filters.title.ar}%` });
      }
    }
  }

  async edit(id, filter) {
    // Get the keys (property names) of the entity's properties
    const columns = Object.keys(this.metadata.propertiesMap);

    // Create a partial object using the filter and the entity's property names
    const partialFilter = columns.reduce((acc, curr) => {
      if (filter[curr] !== undefined) {
        acc[curr] = filter[curr];
      }
      return acc;
    }, {});

    // Update the entity with the partial object
    const res = await this.update(id, partialFilter);

    if (res.affected === 0) {
      throw new NotFoundException('Person Not Found!');
    }

    return true;
  }

  async getOne(id): Promise<Post> {
    const Person = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);

    return await Person
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.id = :id', { id: id })
      .getOne();
  }

  async getAllPost(queryString) {
    try {
      const Post = this.createQueryBuilder('p');
      const columns = Object.keys(this.metadata.propertiesMap);
      const pageSize = Number(queryString.pageSize)
      const pageIndex = Number(queryString.pageIndex)
      if (!queryString.searchColumn || queryString.searchColumn == "") {
        return await Post
          .select(columns.map(column => `p.${column}`))
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
      else if (queryString.searchColumn == "phone") {
        return await Post
          .select(columns.map(column => `p.${column}`))
          .where("p.phone like :phone", { phone: `%${queryString.searchText}%` })
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
      else if (queryString.searchColumn == "email") {
        return await Post
          .select(columns.map(column => `p.${column}`))
          .where("p.email like :email", { email: `%${queryString.searchText}%` })
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
      else if (queryString.searchColumn == "nationalCode") {
        return await Post
          .select(columns.map(column => `p.${column}`))
          .where("p.nationalCode like :nationalCode", { nationalCode: `%${queryString.searchText}%` })
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
    } catch (e) {
      console.log(e);
    }
  }

}
