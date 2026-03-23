export interface TeamMemberData {
  name: string
  role: string
  image: string
  /** Optional LinkedIn profile URL */
  linkedin?: string
}

export interface TeamGroup {
  groupKey: string
  members: TeamMemberData[]
}

const DEFAULT_IMAGE = '/team/daryan.jpg'
const DEFAULT_LINKEDIN = 'https://www.linkedin.com/in/daryankamalifar'

export const founders: TeamMemberData[] = [
  {
    name: 'Daryan Kamalifar',
    role: 'Co-Founder / CTO',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
  {
    name: 'Daryan Kamalifar',
    role: 'Co-Founder / CEO',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
]

export const advisers: TeamMemberData[] = [
  {
    name: 'Daryan Kamalifar',
    role: 'Adviser',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
  {
    name: 'Daryan Kamalifar',
    role: 'Adviser',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
  {
    name: 'Daryan Kamalifar',
    role: 'Adviser',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
]

export const teamMembers: TeamMemberData[] = [
  {
    name: 'Daryan Kamalifar',
    role: 'Software Engineer',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
  {
    name: 'Daryan Kamalifar',
    role: 'Data Scientist',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
  {
    name: 'Daryan Kamalifar',
    role: 'Product Designer',
    image: DEFAULT_IMAGE,
    linkedin: DEFAULT_LINKEDIN,
  },
]
