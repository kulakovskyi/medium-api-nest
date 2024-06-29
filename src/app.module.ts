import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import ormconfig from './ormconfig';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TagModule, TypeOrmModule.forRoot(ormconfig), UserModule],
})
export class AppModule {}
