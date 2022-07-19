import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum RequestTopicStatus {
  PENDING = 0,
  APPROVED = 1,
  DECLINED = -1,
}

@Entity()
export class RequestTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: RequestTopicStatus,
    default: RequestTopicStatus.PENDING
  })
  status: RequestTopicStatus;

  @Column({ type: 'bigint' })
  created_at: number;
}
