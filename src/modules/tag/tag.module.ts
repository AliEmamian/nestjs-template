
import { Module ,forwardRef} from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { TagService } from './tag.service';
import { TagRepository } from './tag.repository';
import { TagController } from './tag.controller';


@Module({
  imports: [
    forwardRef(()=>AuthModule),
  ],
  exports: [TagService, TagRepository],
  controllers: [TagController],
  providers: [
    TagRepository,
    TagService,
  ],
})
export class TagModule {}
