import { InlineWidget, useCalendlyEventListener } from 'react-calendly'

const BookTimeModel = () => {
  useCalendlyEventListener({
    onProfilePageViewed: () => console.log('onProfilePageViewed'),
    onDateAndTimeSelected: () => console.log('onDateAndTimeSelected'),
    onEventTypeViewed: () => console.log('onEventTypeViewed'),
    onEventScheduled: (e) => console.log(e.data.payload),
    onPageHeightResize: (e) => console.log(e.data.payload.height),
  })

  return (
    <div>
      <InlineWidget
        url="https://calendly.com/twinspire-info/30min"
        styles={{ height: '700px' }}
      />
    </div>
  )
}

export default BookTimeModel
