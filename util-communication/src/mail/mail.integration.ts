import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import env from '../app.env';

@Injectable()
export class MailIntegration {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly httpService: HttpService) {}

  private transport = createTransport({
    host: env.MAILTRAP_HOST,
    port: env.MAILTRAP_PORT as number,
    auth: {
      user: env.MAILTRAP_USER,
      pass: env.MAILTRAP_PASS,
    },
  });

  async send(text: string, to: string, subject: string): Promise<void> {
    await this.transport.sendMail({ text, to, subject });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    this.send(text, to, subject);
  }
}
