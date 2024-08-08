import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { CollectTag } from "./entities/tag.entity";
import { EntityManager, Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";


@Injectable()
export class TagService {

  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(CollectTag)
  private tagRepo: Repository<CollectTag>;


  /**
   * 保存一个 Tag
   */
  async addTag(tag: CreateTagDto) {
    const newTag: CreateTagDto = {
      name: tag.name,
      remark: tag.remark,
      color: tag.color
    }
    await this.tagRepo.save(newTag)
  }

  /**
   * 查询所有 Tag
   */
  async queryAll() {
    return await this.tagRepo.find()
  }

  /**
   * 根据id删除一个Tag
   */
  async removeTagById(id: string) {
    const item = await this.tagRepo.findOneBy({ id })
    if (item) {
      await this.tagRepo.remove(item);
    }
  }

  /**
   * 根据id修改一个Tag
   */
  async updateTag(id: string, tag: CreateTagDto) {
    const item = await this.tagRepo.findOneBy({ id })
    item.name = tag.name
    item.remark = tag.remark
    item.color = tag.color
    await this.tagRepo.save(item)
  }

}
