import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CollectUrl } from "./entities/url.entity";

@Injectable()
export class UrlService {

  @InjectRepository(CollectUrl)
  private urlRepository: Repository<CollectUrl>;

  async queryAll() {
    return await this.urlRepository.find();
  }
}
