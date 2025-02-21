'use client'
//need to create the society page here, and the lost of upcoming and pas events
//create upcoming and past array by just filtering events based on date
import sampleSocietiesData from "@/app/components/sampleSocietiesData";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from 'next/image'
//import { useParams } from "next/navigation"
//import sampleSocietiesData from "@/data/sampleSocietiesData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'
import { useState, useEffect } from "react";
import fetchSocietiesToDisplay from "@/app/apiFunctions/fetchSocietiesToDisplay";

const sampleSocietiesDataMap = sampleSocietiesData[0];

export default function societyPage() {

    const { societies } = useParams();
    console.log("this is the documentId:", societies);
    const selectedSocietyArray = sampleSocietiesDataMap.filter(society => society.documentId === societies);
    console.log("This is the selected Event:", selectedSocietyArray);

    const selectedSociety = selectedSocietyArray[0];
    console.log("thsi is the selected society:", selectedSociety);
   
    /*const societiesEventsToDisplay = selectedSociety.events;
    console.log("events of the selected society:", societiesEventsToDisplay);*/

    const [ societiesToShow, setSocietiesToShow ] = useState([]); 

    useEffect(() => {
        
        const getSocieties = async () => {
            const societiesToDisplay = await fetchSocietiesToDisplay();
            console.log("Fetched events to display:", societiesToDisplay);
            setSocietiesToShow(societiesToDisplay);
        };

        getSocieties();

    },[])


    const selectedSocietyArray2 = societiesToShow.filter(society => society.documentId === societies);
    console.log("This is the selected society from real strapi info:", selectedSocietyArray2);

    const selectedSociety2 = selectedSocietyArray2[0];
    console.log("thsi is the selected society from strapi data:", selectedSociety2);
  

    

    /* 
    example of what the data of a individual society looks like:
      "id": 3,
          "documentId": "n1g20u2cl3iblblih5ctyjdj",
          "username": "Poetry Enthusiasts Society",
          "email": "poetry@cambridge.edu",
          "provider": "local",
          "confirmed": true,
          "blocked": false,
          "createdAt": "2024-11-29T02:15:00.328Z",
          "updatedAt": "2024-12-02T22:30:10.051Z",
          "publishedAt": "2024-12-02T22:20:10.042Z",
          "events": [
            {
              "id": 4,
              "documentId": "bvwp7jvlxx9xicvzw7lecev8",
              "eventName": "poetry reading",
              "createdAt": "2024-11-28T23:25:00.518Z",
              "updatedAt": "2024-11-28T23:45:47.898Z",
              "publishedAt": null,
              "eventDate": "2024-12-02",
              "eventTime": "19:00:00.000",
              "eventDescription": "Join us for an evening of poetry",
              "eventLocation": "Downing College",
              "eventUrlLink": null,
              "eventImage": {
                "id": 4,
                "documentId": "wtloymec6a870xcpp45b8qjd",
                "name": "poetry_reading_1.png",
                "url": "/uploads/poetry_reading_1.png"
              }
            }
          ]
        },
    
    */
       if (selectedSociety2) {
        const { username, events } = selectedSociety2

        const imageUrl = selectedSociety2?.logo?.url;
        const description = selectedSociety2?.societyDescription;


        console.log("these are all the events passed down to this use:", events);

        const filteredEvents = events.filter(event => event.publishedAt !== null);

console.log("these are the filtered events to prevent duplication:",filteredEvents);

        const currentDate = new Date()
        const upcomingEvents = filteredEvents.filter(event => new Date(event.eventDate) >= currentDate)
        const pastEvents = filteredEvents.filter(event => new Date(event.eventDate) < currentDate)



        return (
          <div className="min-h-screen bg-gray-50">
            <header className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={`http://localhost:1337${imageUrl}`}
                alt={username}
                className="w-full h-full object-cover"
              />
                
              
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">{username}</h1>
              </div>
            </header>
      
            <main className="container mx-auto px-4 py-8">
              <section className="bg-white rounded-lg shadow-md p-6 -mt-16 relative z-10 mb-12">
              <h2 className="text-2xl font-semibold mb-4">About {username}</h2>
                <p className="text-xl text-gray-700 text-center">{description}</p>
              </section>
      
              <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.documentId} event={event} />
                  ))}
                </div>
              </section>
      
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => (
                    <EventCard key={event.documentId} event={event} isPast />
                  ))}
                </div>
              </section>
            </main>
          </div>
        )
}


function EventCard({ event, isPast = false }) {
  const { eventName, eventDate, eventTime, eventDescription, eventLocation, eventImage, eventUrlLink, documentId } = event
  console.log("eventImage value is:", eventImage);

/* 

<Image
          src={`http://localhost:1337/${event.eventImage?.url}` || "/placeholder.svg?height=192&width=384"}
          alt={event.eventName}
          width={500}  // specify width
          height={300} // specify height
        />

*/



  return (
   <Link href={`/events/${documentId}`}>
    <Card className={`overflow-hidden ${isPast ? 'opacity-70' : ''} hover:transform hover:scale-110 transition-transform duration-300`}>
      <div className="relative h-48">
        <Image
          src={`http://localhost:1337/${eventImage ? eventImage.url : '/default-image.jpg'}`}
          alt={eventName}
          width={500}  // specify width
          height={300} // specify height
          
          style={{ objectFit: 'cover' }}
        />
      </div>
      <CardHeader>
        <CardTitle>{eventName}</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {new Date(eventDate).toLocaleDateString()}
          </div>
          <div className="flex items-center mt-1">
            <ClockIcon className="w-4 h-4 mr-2" />
            {eventTime}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{eventDescription}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPinIcon className="w-4 h-4 mr-2" />
          {eventLocation}
        </div>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
   </Link>
  )
}
}