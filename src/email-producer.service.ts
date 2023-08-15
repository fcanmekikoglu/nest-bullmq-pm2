import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { Email } from "./email.interface";

@Injectable()
export class EmailProducerService {
  constructor(@InjectQueue("email") private emailQuee: Queue) {}

  async sendEmail(email: Email) {
    await this.emailQuee.add("send-email", email, { removeOnComplete: true });
  }
}
