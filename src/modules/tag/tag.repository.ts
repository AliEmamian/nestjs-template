import { Tag } from '../../entities/tag.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TagRepository extends Repository<Tag> {
  constructor(private readonly dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }

  async createTag(payload) {
    try {
      return await this.save(payload)
    }
    catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getMany(): Promise<Tag[]> {
    const Tag = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);
return await Tag
    .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .getMany();
  }


  async getOne(id): Promise<Tag> {
    const business = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);

    return await business
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.id = :id', { id: id })
      .getOne();
  }


  async getFilteredTag(pagination, filters) {
    const { pageSize = 10, pageIndex = 0, sortColumn = 'id', sortDesc = 'false' } = pagination;
    const Business = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);
    
    this.applyFilters(Business, filters);

    return await Business
      .select(columns.map(column => `p.${column}`))
      .skip(pageSize * pageIndex)
      .take(pageSize)
      .orderBy(sortColumn, sortDesc === 'true' ? 'DESC' : 'ASC')
      .getManyAndCount();

  }

  private applyFilters(queryBuilder: any, filters: any): void {
    if (filters.fa) {
      queryBuilder.andWhere(`p.fa ILIKE :fa`, { fa: `%${filters.fa}%` });
    }
    if (filters.en) {
      queryBuilder.andWhere(`p.en ILIKE :en`, { en: `%${filters.en}%` });
    }
    if (filters.ar) {
      queryBuilder.andWhere(`p.ar ILIKE :ar`, { ar: `%${filters.ar}%` });
    }
  }
  
  async removeById(id) {
    const business = await this.getOne(id)
    return await this.remove(business);
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
      throw new NotFoundException('Business Not Found!');
    }

    return true;
  }
 
}
