export interface TeamMemberData {
  name: string
  role: string
  /** Optional translation key for a short bio / description */
  description?: string
  image: string
  /** Optional LinkedIn profile URL */
  linkedin?: string
}

export interface TeamGroup {
  groupKey: string
  members: TeamMemberData[]
}

export const founders: TeamMemberData[] = [
  {
    name: 'Pouya Tobias Strand Nikoui',
    role: 'team.roles.founderCeo',
    description: 'team.descriptions.pouya',
    image: '/team/pouya.png',
    linkedin: 'https://www.linkedin.com/in/pnikoui/',
  },
  {
    name: 'Prof. John Paulin Hansen',
    role: 'team.roles.academicCoFounder',
    description: 'team.descriptions.john',
    image: '/team/john.png',
    linkedin: 'https://www.linkedin.com/in/johnpaulinhansen/',
  },
  {
    name: 'Daryan Kamalifar',
    role: 'team.roles.coFounderDev',
    description: 'team.descriptions.daryan',
    image: '/team/daryan.jpg',
    linkedin: 'https://www.linkedin.com/in/daryan-kf/',
  },
  {
    name: 'Roxane Maar',
    role: 'team.roles.coFounderCoo',
    description: 'team.descriptions.roxane',
    image: '/team/roxane.png',
    linkedin: 'https://www.linkedin.com/in/roxanemaar/',
  },
]

export const teamMembers: TeamMemberData[] = [
  {
    name: 'Christos Andreas Ntemkas',
    role: 'team.roles.cloudCyberEngineer',
    image: '/team/christos.png',
    linkedin: 'https://www.linkedin.com/in/christos-andreas-ntemkas-25a27815a/',
  },
  {
    name: 'Csongor Tarnai',
    role: 'team.roles.devOpsEngineer',
    image: '/team/csongor.png',
    linkedin: 'https://www.linkedin.com/in/csongor-tarnai-65a4042b5/',
  },
  {
    name: 'Hajar El Mhassani',
    role: 'team.roles.internFullStackDev',
    image: '/team/hajar.png',
    linkedin: 'https://www.linkedin.com/in/hajar-el-mhassani-54202b120/',
  },
  {
    name: 'Ali',
    role: 'team.roles.machineLearningIntern',
    description: 'team.descriptions.ali',
    image: '/team/ali.png',
  },
  {
    name: 'Nicola Stefani',
    role: 'team.roles.researchTeam',
    image: '/team/nicola.png',
    linkedin: 'https://www.linkedin.com/in/nicola-stefani-078a3a232/',
  },
  {
    name: 'Hilmar Snær Örvarsson',
    role: 'team.roles.researchTeam',
    image: '/team/hilmar.png',
    linkedin:
      'https://www.linkedin.com/in/hilmar-sn%C3%A6r-%C3%B6rvarsson-400850263/',
  },
]

export const advisers: TeamMemberData[] = [
  {
    name: 'Kim Kragbæk Larsen',
    role: 'team.roles.marketAdvisor',
    description: 'team.descriptions.kim',
    image: '/team/kim.png',
    linkedin: 'https://www.linkedin.com/in/kimkragbaeklarsen/',
  },
]
