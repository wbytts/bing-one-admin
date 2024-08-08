import { forwardRef, Module } from "@nestjs/common";
import { UrlController } from './url.controller';
import { CollectService } from './collect.service';
import { UrlService } from "./url.service";
import { AppModule } from "../../app.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectUrl } from "./entities/url.entity";
import { TagService } from "./tag.service";
import { TagController } from "./tag.controller";

@Module({
  imports: [forwardRef(() => AppModule), TypeOrmModule.forFeature([CollectUrl])],
  controllers: [UrlController, TagController],
  providers: [CollectService, UrlService, TagService]
})
export class CollectModule { }
