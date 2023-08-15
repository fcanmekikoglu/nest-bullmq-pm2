import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { HashData } from "./hash.interface";

@Injectable()
export class HashProducerService {
  constructor(@InjectQueue("hash") private hashQueue: Queue) {}

  async hashString(data: HashData) {
    await this.hashQueue.add("hash-string", data, { removeOnComplete: true });
  }
}
