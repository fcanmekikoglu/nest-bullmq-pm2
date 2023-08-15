import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Email } from "./email.interface";

@Processor("email")
export class EmailConsumerService {
  @Process({name: "send-email", concurrency: 10})
  async sendEmailJob(job: Job<Email>) {
    const { to, subject, text } = job.data;

    await new Promise((resolve) => setTimeout(resolve, 7000));

    // console.log(`Sending email to ${to} with subject ${subject} and text ${text}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(job.data)}`);
  }
}
