import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BullModule } from "@nestjs/bull";
import { EmailProducerService } from "./email-producer.service";
import { EmailConsumerService } from "./email-consumer.service";
import { HashConsumerService } from "./hash-consumer.service";
import { HashProducerService } from "./hash-producer.service";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: "email",
    }),
    BullModule.registerQueue({
      name: "hash",
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailProducerService,
    EmailConsumerService,
    HashConsumerService,
    HashProducerService,
  ],
})
export class AppModule {}
