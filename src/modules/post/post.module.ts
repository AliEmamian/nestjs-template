import { Module ,forwardRef} from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [
    forwardRef(()=>AuthModule),
  ],
  exports: [PostService, PostRepository],
  controllers: [PostController],
  providers: [
    PostRepository,
    PostService,
  ],
})
export class PostModule {}
