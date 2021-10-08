import { Injectable } from '@nestjs/common';
import { MailIntegration } from './mail.integration';

@Injectable()
export class MailService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly mailIntegration: MailIntegration) {}

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    await this.mailIntegration.sendMail(to, subject, text);
  }

  async sendCountMail(email: string, count: number): Promise<void> {
    this.sendMail(
      email,
      'Contagem de produtos',
      `Existem ${count} produtos no site`,
    );
  }
}
