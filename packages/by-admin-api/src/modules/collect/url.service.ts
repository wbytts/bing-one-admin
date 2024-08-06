import { Injectable } from "@nestjs/common";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { CollectUrl } from "./entities/url.entity";
import { CreateUrlDto } from "./dto/create-url.dto";

@Injectable()
export class UrlService {

  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(CollectUrl)
  private urlRepository: Repository<CollectUrl>;

  /**
   * 保存一个URL
   * @param url 
   */
  async addUrl(url: CreateUrlDto) {
    const newUrl: CreateUrlDto = {
      title: url.title,
      url: url.url,
      remark: url.remark
    }
    await this.urlRepository.save(newUrl)
  }

  /**
   * 查询所有URL
   * @returns 
   */
  async queryAll() {
    return await this.urlRepository.find();
  }

  /**
   * 根据id删除一个URL
   * @param id 
   */
  async removeUrlById(id) {
    const item = await this.urlRepository.findOneBy({ id })
    if (item) {
      await this.urlRepository.remove(item);
    }
  }

  async updateUrl(params) {
    const item = await this.urlRepository.findOneBy({ id: params.id })
    item.title = params.title
    item.url = params.url
    item.remark = params.remark
    await this.urlRepository.save(item)
  }
}
