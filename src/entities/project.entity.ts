import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TechnologyToProject } from "./technologyToProject.entity";
import { User } from "./user.entity";

@Entity("projects")
class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 360 })
  description: string;

  @Column({ type: "float" })
  estimated_time: number;

  @Column({ type: "date" })
  start_date: string;

  @Column({ type: "date", nullable: true })
  end_date?: string;

  @Column({ length: 120 })
  repository: string;

  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @OneToMany(
    () => TechnologyToProject,
    (technologyToProject) => technologyToProject.project
  )
  technologiesToProject: TechnologyToProject[];
}

export { Project };
