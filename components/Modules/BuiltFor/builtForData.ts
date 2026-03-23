export interface BuiltForItem {
  title: string
  description: string
  image: string
}

export const builtForData: BuiltForItem[] = [
  {
    title: 'Footballers',
    description:
      'Your body produces data every session. Most of it disappears when you change clubs. The Athletic Passport captures it and gives it back to you. Yours to keep.',
    image: '/first.jpeg',
  },
  {
    title: 'Coaches and Performance Staff',
    description:
      'See neuromuscular load, recovery signals, and deviation flags across your whole squad. Plan training around real physiology. Keep your best players available when it matters most.',
    image: '/last.jpg',
  },
  {
    title: 'Physiotherapists',
    description:
      'Objective neuromuscular data at every decision point. Track EMG activity, asymmetry, and load tolerance over time. Catch changes before they become injuries. Make return-to-play calls you can stand behind.',
    image: '/avatar.jpg',
  },
]
