import { Transaction } from '../../transaction/entities/transaction.entity';
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
import { Distributor } from '../../distributor/entities/distributor.entity';

@Entity({ name: 'shops' })
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Distributor, (distributor) => distributor.shops)
  @JoinColumn({ name: 'distributor_id' })
  distributor: Distributor;

  @OneToMany(() => Transaction, (transaction) => transaction.shop)
  transactions: Transaction[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
