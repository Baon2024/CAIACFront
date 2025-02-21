import EventCard from "./eventCard"
//import type { Event } from "@/types/event"
import sampleEventsData from "./sampleEventsData"
import { sampleEventsData2 } from "./sampleEventsData"


export default function EventsList({eventsToShow}) {



  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*sampleEventsData2*/eventsToShow.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            documentId={event.documentId}
            eventName={event.eventName}
            eventDate={event.eventDate}
            eventTime={event.eventTime}
            eventDescription={event.eventDescription}
            eventLocation={event.eventLocation}
            eventImage={event.eventImage}
            eventUrlLink={event.eventUrlLink}
            society={event.society}
          />
        ))}
      </div>
    </div>
  )
}
