import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { RawData, ResponseData } from './core';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'Hello Nest';
  }

  @Get('throw')
  throw() {
    throw new HttpException('用户未认证', HttpStatus.UNAUTHORIZED);
  }

  @Get('error')
  error() {
    const a: any = {};
    return a.b.c;
  }

  @Get('success')
  success() {
    return 'success';
  }

  @RawData()
  @Get('raw-data')
  rawData() {
    return ResponseData.success('success');
  }
}
