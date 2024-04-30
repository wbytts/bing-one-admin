import { Injectable } from '@nestjs/common';

// 声明了 @Injectable，代表这个 class 可注入，那么 nest 就会把它的对象放到 IOC 容器里。
@Injectable()
export class TestService {}
