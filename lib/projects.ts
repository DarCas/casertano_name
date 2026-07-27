export interface ProjectMedia {
  type: "image" | "video"
  src: string
  alt?: string
}

export interface Project {
  slug: string
  title: string
  short: string
  tags: string[]
  description: string
  features: string[]
  skills: string[]
  media?: ProjectMedia[]
}

import projectsData from "@/content/projects.json"
export { projectsData as default }
