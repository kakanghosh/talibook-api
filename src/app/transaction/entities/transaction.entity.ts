import { Shop } from '../../shop/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TransactionType {
  DEPOSITE,
  PURCHASE,
}

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shop, (distributor) => distributor.transactions)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column()
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
