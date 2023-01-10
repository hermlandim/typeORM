import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("adress")
class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  street: string;

  @Column({ length: 5 })
  number: string;

  @Column({ length: 8 })
  zip_code: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 50, nullable: true })
  informations?: string;
}

export default Address;
