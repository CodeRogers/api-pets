import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./Pet";

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.client_id, { cascade: true })
  @JoinColumn({})
  pet: Pet[];
}
