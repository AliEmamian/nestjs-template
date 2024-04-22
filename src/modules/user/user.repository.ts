import { User } from '../../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(payload) {
    try {
      console.log('payload', payload);
      payload.createdAt = Math.floor(new Date().getTime() / 1000)
      let res = await this.save(payload)
      return res.id;
    }
    catch (e) {
      console.log(e);

      throw e;
    }
  }

  async getOne(id): Promise<User> {
    const User = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);

    return await User
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.id = :id', { id: id })
      .getOne();
  }

  async getOneByPhone(phone): Promise<User> {
    const User = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);
    return await User
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.phone = :phone', { phone: phone })
      .getOne();
  }

  async getOneByEmail(email): Promise<User> {
    const User = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);
    return await User
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.email = :email', { email: email })
      .getOne();
  }


  async getOneByNationalCode(nationalCode): Promise<User> {
    const User = this.createQueryBuilder('p');
    const columns = Object.keys(this.metadata.propertiesMap);
    return await User
      .select(columns.map(column => `p.${column}`)) // Build select clause dynamically
      .where('p.nationalCode = :nationalCode', { nationalCode: nationalCode })
      .getOne();
  }
  async edit(id, filter): Promise<boolean> {
    let {
      phone,
      extraPhones,
      email,
      extraEmails,
      password,
      isActive,
      otpCode,
      expireOtp,
      countOtp,
      mac,
      nationalCode
    } =
      filter;

    let validate;

    let res = await this.update(id, {
      phone,
      extraPhones,
      email,
      extraEmails,
      password,
      isActive,
      otpCode,
      countOtp,
      expireOtp,
      mac,
      nationalCode
    });
    if (!res.affected) {
      throw new NotFoundException('User Not Found !');
    }
    return true;
  }



  async getAllUser(queryString) {
    try {
      const User = this.createQueryBuilder('p');
      const columns = Object.keys(this.metadata.propertiesMap);
      const pageSize = Number(queryString.pageSize)
      const pageIndex = Number(queryString.pageIndex)
      if (!queryString.searchColumn || queryString.searchColumn == "") {
        return await User
          .select(columns.map(column => `p.${column}`))
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
      else if (queryString.searchColumn == "phone") {
        return await User
          .select(columns.map(column => `p.${column}`))
          .where("p.phone like :phone", { phone: `%${queryString.searchText}%` })
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
      else if (queryString.searchColumn == "email") {
        return await User
          .select(columns.map(column => `p.${column}`))
          .where("p.email like :email", { email: `%${queryString.searchText}%` })
          .skip(pageSize * pageIndex)
          .take(pageSize)
          .orderBy(queryString.sortColumn, (queryString.sortDesc == true ? "DESC" : "ASC") as "DESC" | "ASC" | undefined)
          .getManyAndCount();
      }
      else if (queryString.searchColumn == "nationalCode") {
        return await User
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
