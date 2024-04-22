
import { Routes } from 'nest-router';
import { UserModule } from './modules/user/user.module'; 
export const routes: Routes = [
  {
    path: '/user',
    module: UserModule,
  },
  
];
