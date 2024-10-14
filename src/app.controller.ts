import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

class FormUrlencodedDto {
  username: string;
  password: string;
}

@Controller('/data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /** URL Param */
  @Get('/url/:id')
  urlParam(@Param('id') id: string) {
    return {
      id,
    };
  }

  /** Query */
  @Get('/query')
  query(@Query('param1') param1: string, @Query('param2') param2: number) {
    return {
      param1,
      param2,
    };
  }

  /** Form Urlencoded */
  @Post('/form-urlencoded')
  async formUrlencoded(@Body() signupDto: FormUrlencodedDto) {
    return signupDto;
  }

  /** Form Urlencoded */
  @Post('/form-data')
  @UseInterceptors(FileInterceptor('file'))
  formData(
    @Body() signupDto: FormUrlencodedDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    return signupDto;
  }

  /** Json */
  @Post('/json') async json(@Body() signupDto: FormUrlencodedDto) {
    return signupDto;
  }
}
