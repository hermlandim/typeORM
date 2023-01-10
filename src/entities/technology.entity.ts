import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TechnologyToProject } from "./technologyToProject.entity";

@Entity("technologies")
class Technology {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @OneToMany(
    () => TechnologyToProject,
    (technologyToProject) => technologyToProject.technology
  )
  technologyToProject: TechnologyToProject[];
}

export { Technology };
