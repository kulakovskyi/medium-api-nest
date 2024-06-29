import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TagModule],
})
export class AppModule {}
