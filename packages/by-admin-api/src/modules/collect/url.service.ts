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

  async addUrl(url: CreateUrlDto) {
    const newUrl: CreateUrlDto = {
      title: url.title,
      url: url.url,
      remark: url.remark
    }
    await this.urlRepository.save(newUrl)
  }

  async queryAll() {
    return await this.urlRepository.find();
  }
}
