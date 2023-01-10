import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";
import { Technology } from "./technology.entity";

@Entity("technology_projects")
class TechnologyToProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  added_in: string;

  @ManyToOne(() => Project, (project) => project.technologiesToProject)
  project: Project;

  @ManyToOne(() => Technology, (technology) => technology.technologyToProject)
  technology: Technology;
}

export { TechnologyToProject };
