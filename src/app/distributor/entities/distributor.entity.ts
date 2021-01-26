import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../../shop/entities/shop.entity';

@Entity({ name: 'distributors' })
export class Distributor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.distributors)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Shop, (shop) => shop.distributor)
  shops: Shop[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
