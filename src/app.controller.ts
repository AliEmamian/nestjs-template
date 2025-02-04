import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('/heartbeat')
  public async heartBeat(): Promise<void> {
    // Check that the connection to db is established
    try {
      console.log('heartBeat');
      
    } catch (error) {
      throw new ServiceUnavailableException();
    }
  }
}
