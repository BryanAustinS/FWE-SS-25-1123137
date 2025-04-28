import React from 'react'
import { Trip } from '@/service'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
} from '@/components/ui/card';

interface TripCardProps {
  trip: Trip;
  onClick?: (id: string) => void
}

export const TripCard: React.FC<TripCardProps> = ({trip, onClick}) => {
  const { name, description, imageUrl, startDate, endDate } = trip;

  return (
    <Card className="p-2 "> 
      <CardHeader>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  )
}
