import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    return true;
  }

  /**
   * 查询所有用户列表
   * @returns
   */
  async findAll() {
    const users = await this.userRepository.find();
    users.forEach(u => delete u.password);
    return users;
  }

  /**
   * 分页查询用户列表
   * @param pageNum 当前页面
   * @param pageSize 每页大小
   * @returns
   */
  async queryPage(pageNum: number, pageSize: number) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize
    });
    return [users, total];
  }

  /**
   * 根据id查询指定用户
   * @param id 用户id
   * @returns
   */
  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return true;
  }
}
