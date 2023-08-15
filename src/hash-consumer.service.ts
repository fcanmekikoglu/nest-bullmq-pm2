import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { HashData } from "./hash.interface";
import * as crypto from "crypto";

@Processor("hash")
export class HashConsumerService {
  @Process({ name: "hash-string", concurrency: 2 })
  async hashStringJob(job: Job<HashData>) {
    const { inputString } = job.data;
    let hash = inputString;

    for (let i = 0; i < 500000; i++) {
      hash = crypto.createHash("sha256").update(hash).digest("hex");
    }
    console.log(`Hashed string: ${hash}`);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name}`);
  }
}
