import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {
  }

  public confirmationEmail(to, url): void {
    //todo fix email to
    this.mailerService.sendMail({
      to: 'nail00749@icloud.com',
      from: 'nail00749@gmail.com',
      subject: 'confirmation email',
      template: 'confirmation',
      context: {
        to,
        url,
      },
    }).then().catch(
      (e) => console.log(e),
    );
  }

}
