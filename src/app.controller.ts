import { Controller, Get, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { EmailProducerService } from "./email-producer.service";
import { Email } from "./email.interface";
import { HashProducerService } from "./hash-producer.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailProducerService: EmailProducerService,
    private readonly hashProducerService: HashProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("email")
  async startJob() {
    const baseEmail: Email = {
      to: "fcanmekikoglu@gmail.com",
      subject: "about queues",
      text: "this is mail body",
    };

    // Create and add 100 emails to the queue
    for (let i = 1; i <= 100; i++) {
      const email = { ...baseEmail, subject: `about queues - Email ${i}` };
      await this.emailProducerService.sendEmail(email);
    }
    return { status: "100 emails added to the queue!" };
  }

  @Get("hash")
  async hashString(@Query("input") input: string) {
    console.log(input);

    const promises = [];
    for (let i = 0; i < 500; i++) {
      promises.push(this.hashProducerService.hashString({ inputString: input }));
    }

    await Promise.all(promises);

    return { status: "500 strings added to hashing queue!" };
  }
}
