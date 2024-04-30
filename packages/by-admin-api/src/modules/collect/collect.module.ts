import { forwardRef, Module } from "@nestjs/common";
import { UrlController } from './url.controller';
import { CollectService } from './collect.service';
import { UrlService } from "./url.service";
import { AppModule } from "../../app.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CollectUrl } from "./entities/url.entity";

@Module({
  imports: [forwardRef(() => AppModule), TypeOrmModule.forFeature([CollectUrl])],
  controllers: [UrlController],
  providers: [CollectService, UrlService]
})
export class CollectModule {}
