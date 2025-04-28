import React from 'react'
import { Trip } from '@/service'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TripCardProps {
  trip: Trip;
  onClick?: (id: string) => void
}

export const TripCard: React.FC<TripCardProps> = ({trip, onClick}) => {
  const { name, description, imageUrl, startDate, endDate } = trip;

  return (
      <Card className="w-[350px] h-full gap-10 bg-white shadow-md hover:shadow-2xl transition-shadow overflow-hidden">
        {imageUrl && (
          <div className="px-6 pt-6 pb-2"> 
            <img 
              className="w-full h-auto aspect-[3/2] rounded-lg object-cover" 
              src={imageUrl} 
              alt={name} 
            />
          </div>
        )}
      <CardHeader>
      <CardTitle 
      >{name}</CardTitle>
        <CardDescription>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</CardDescription>
      </CardHeader>

      <CardContent>{description}</CardContent>
    </Card>
  )
}
