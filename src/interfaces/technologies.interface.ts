export interface ITechnologiesRequest {
  name: string;
  added_in: string;
}

export interface ITechnologyProject {
  technologies: Array<ITechnologiesRequest>;
}
