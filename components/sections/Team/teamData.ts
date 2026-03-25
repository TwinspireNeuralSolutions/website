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
    role: 'Founder & CEO',
    image: '/team/pouya.png',
    linkedin: 'https://www.linkedin.com/in/pnikoui/',
  },
  {
    name: 'Prof. John Paulin Hansen',
    role: 'Academic Co-Founder & Head of Research',
    image: '/team/john.png',
    linkedin: 'https://www.linkedin.com/in/johnpaulinhansen/',
  },
  {
    name: 'Daryan Kamalifar',
    role: 'Co-Founder & Lead Developer',
    image: '/team/daryan.jpg',
    linkedin: 'https://www.linkedin.com/in/daryan-kf/',
  },
]

export const teamMembers: TeamMemberData[] = [
  {
    name: 'Csongor Tarnai',
    role: 'Research Team',
    image: '/team/csongor.png',
    linkedin: 'https://www.linkedin.com/in/csongor-tarnai-65a4042b5/',
  },
  {
    name: 'Hajar El Mhassani',
    role: 'Full Stack Developer',
    image: '/team/hajar.png',
    linkedin: 'https://www.linkedin.com/in/hajar-el-mhassani-54202b120/',
  },
  {
    name: 'Nicola Stefani',
    role: 'Research Team',
    image: '/team/nicola.png',
    linkedin: 'https://www.linkedin.com/in/nicola-stefani-078a3a232/',
  },
  {
    name: 'Christos Andreas Ntemkas',
    role: 'Generative AI Engineer',
    image: '/team/christos.png',
    linkedin: 'https://www.linkedin.com/in/christos-andreas-ntemkas-25a27815a/',
  },
  {
    name: 'Hilmar Snær Örvarsson',
    role: 'Research Team',
    image: '/team/hilmar.png',
    linkedin:
      'https://www.linkedin.com/in/hilmar-sn%C3%A6r-%C3%B6rvarsson-400850263/',
  },
]

export const advisers: TeamMemberData[] = [
  {
    name: 'Thomas Dederenroth Miller',
    role: 'Advisor',
    image: '/team/thomas.png',
    linkedin: 'https://www.linkedin.com/in/thomas-d-miller-6940879/',
  },
  {
    name: 'Roxane Maar',
    role: 'Strategic Advisor',
    image: '/team/roxane.png',
    linkedin: 'https://www.linkedin.com/in/roxanemaar/',
  },
  {
    name: 'Kim Kragbæk Larsen',
    role: 'Advisor',
    image: '/team/kim.png',
    linkedin: 'https://www.linkedin.com/in/kimkragbaeklarsen/',
  },
]
