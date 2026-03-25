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

export const founders: TeamMemberData[] = [
  {
    name: 'Pouya Tobias Strand Nikoui',
    role: 'team.roles.founderCeo',
    image: '/team/pouya.png',
    linkedin: 'https://www.linkedin.com/in/pnikoui/',
  },
  {
    name: 'Prof. John Paulin Hansen',
    role: 'team.roles.academicCoFounder',
    image: '/team/john.png',
    linkedin: 'https://www.linkedin.com/in/johnpaulinhansen/',
  },
  {
    name: 'Daryan Kamalifar',
    role: 'team.roles.coFounderDev',
    image: '/team/daryan.jpg',
    linkedin: 'https://www.linkedin.com/in/daryan-kf/',
  },
]

export const teamMembers: TeamMemberData[] = [
  {
    name: 'Csongor Tarnai',
    role: 'team.roles.researchTeam',
    image: '/team/csongor.png',
    linkedin: 'https://www.linkedin.com/in/csongor-tarnai-65a4042b5/',
  },
  {
    name: 'Hajar El Mhassani',
    role: 'team.roles.fullStackDev',
    image: '/team/hajar.png',
    linkedin: 'https://www.linkedin.com/in/hajar-el-mhassani-54202b120/',
  },
  {
    name: 'Nicola Stefani',
    role: 'team.roles.researchTeam',
    image: '/team/nicola.png',
    linkedin: 'https://www.linkedin.com/in/nicola-stefani-078a3a232/',
  },
  {
    name: 'Christos Andreas Ntemkas',
    role: 'team.roles.aiEngineer',
    image: '/team/christos.png',
    linkedin: 'https://www.linkedin.com/in/christos-andreas-ntemkas-25a27815a/',
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
    name: 'Thomas Dederenroth Miller',
    role: 'team.roles.advisor',
    image: '/team/thomas.png',
    linkedin: 'https://www.linkedin.com/in/thomas-d-miller-6940879/',
  },
  {
    name: 'Roxane Maar',
    role: 'team.roles.strategicAdvisor',
    image: '/team/roxane.png',
    linkedin: 'https://www.linkedin.com/in/roxanemaar/',
  },
  {
    name: 'Kim Kragbæk Larsen',
    role: 'team.roles.advisor',
    image: '/team/kim.png',
    linkedin: 'https://www.linkedin.com/in/kimkragbaeklarsen/',
  },
]
