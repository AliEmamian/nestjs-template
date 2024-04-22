import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { UserRepository } from './modules/user/user.repository';

@Controller()
export class AppController {
  constructor(private userRepository: UserRepository) {}

  @Get('/heartbeat')
  public async heartBeat(): Promise<void> {
    // Check that the connection to db is established
    try {
      console.log('heartBeat');
      
      await this.userRepository.findOne({ where: {} });
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
