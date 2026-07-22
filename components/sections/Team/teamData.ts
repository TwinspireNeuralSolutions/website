export interface TeamMemberData {
  name: string
  role: string
  description?: string
  image: string
  linkedin?: string
}

export interface TeamGroup {
  groupKey: string
  members: TeamMemberData[]
}

// Row 1 — Founders
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

// Row 2 — Team
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
    name: 'Nicola Stefani',
    role: 'team.roles.researchTeam',
    image: '/team/nicola.png',
    linkedin: 'https://www.linkedin.com/in/nicola-stefani-078a3a232/',
  },
  {
    name: 'Hilmar Snær Örvarsson',
    role: 'team.roles.researchTeam',
    image: '/team/hilmar.png',
    linkedin: 'https://www.linkedin.com/in/hilmar-sn%C3%A6r-%C3%B6rvarsson-400850263/',
  },
]

// Row 3 — Advisory Board
export const advisers: TeamMemberData[] = [
  {
    name: 'Adam Foss',
    role: 'team.roles.marketAdvisor',
    description: 'team.descriptions.adamFoss',
    image: '/team/adam-foss.jpg',
    linkedin: 'https://www.linkedin.com/in/adam-foss-88430a2/',
  },
  {
    name: 'Kanishka Sina',
    role: 'team.roles.footballAdvisor',
    description: 'team.descriptions.kanishkaSina',
    image: '/team/kanishka-sina.jpg',
    linkedin: 'https://www.linkedin.com/in/kanishkasina/',
  },
  {
    name: 'Joachim Christgau',
    role: 'team.roles.brandAdvisor',
    description: 'team.descriptions.joachimChristgau',
    image: '/team/joachim-christgau.jpg',
    linkedin: 'https://www.linkedin.com/in/joachimchristgau/',
  },
  {
    name: 'Johan Kisum',
    role: 'team.roles.advisor',
    description: 'team.descriptions.johanKisum',
    image: '/team/johan-kisum.jpg',
  },
]
