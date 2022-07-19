import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  topic_id: number;

  @Column()
  topic_name: string;

  @Column()
  hot_status: boolean;

  @Column({ type: 'bigint' })
  created_at: number;
}
