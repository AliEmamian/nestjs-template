
import { Routes } from 'nest-router';
import { PostModule } from './modules/post/post.module'; 
import { TagModule } from '@modules/tag/tag.module';
export const routes: Routes = [
  {
    path: '/post',
    module: PostModule,
  },
  {
    path: '/tag',
    module: TagModule,
  },
  
];
