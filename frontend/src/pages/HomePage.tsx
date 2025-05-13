import {
  useState,
  useEffect,
} from 'react';
import {
  useNavigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import {
  TripService,
  Trip,
  DestinationService,
} from '../service';
import { TripCard } from '../components/trip/TripCard';
import {
  Grid,
  Container,
  Center,
  Flex,
  Loader,
  Text,
  Group,
  Badge,
} from '@mantine/core';
import { EmptyCard } from '@/components/trip/EmptyCard';

const HomePage = () => {
  const [trips, setTrips] = useState<
    Trip[]
  >([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] =
    useState(false);
  const [searchParams] =
    useSearchParams();
  const [
    isSearchResults,
    setIsSearchResults,
  ] = useState(false);

  const fetchTrips = async () => {
    setLoading(true);
    setIsSearchResults(false);

    try {
      const trips =
        await TripService.getAllTrips();
      setTrips(trips);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    const query =
      searchParams.get('query');
    const date =
      searchParams.get('date');
    const searchType =
      searchParams.get('type') || 'all';

    if (!query && !date) {
      fetchTrips();
      return;
    }

    try {
      let searchResults: Trip[] = [];

      if (
        query &&
        (searchType === 'all' ||
          searchType === 'trip')
      ) {
        const nameResults =
          await TripService.getTripByNameContains(
            query
          );
        searchResults = [
          ...nameResults,
        ];
      }

      if (
        date &&
        (searchType === 'all' ||
          searchType === 'date')
      ) {
        const dateResults =
          await TripService.getTripByDate(
            date
          );
        dateResults.forEach(
          (dateTrip) => {
            if (
              !searchResults.some(
                (trip) =>
                  trip.id ===
                  dateTrip.id
              )
            ) {
              searchResults.push(
                dateTrip
              );
            }
          }
        );
      }

      if (
        query &&
        (searchType === 'all' ||
          searchType === 'destination')
      ) {
        const destinationResults =
          await DestinationService.getDestinationByNameContains(
            query
          );

        for (const destination of destinationResults) {
          const tripResult =
            await TripService.getTripById(
              destination.tripId
            );
          if (
            tripResult &&
            !searchResults.some(
              (trip) =>
                trip.id ===
                tripResult.id
            )
          ) {
            searchResults.push(
              tripResult
            );
          }
        }
      }

      setTrips(searchResults);
      setIsSearchResults(true);
      setLoading(false);
    } catch (error) {
      console.error(
        'Search error:',
        error
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      !searchParams.has('query') &&
      !searchParams.has('date')
    ) {
      fetchTrips();
    } else {
      handleSearch();
    }
  }, [location.key, searchParams]);

  const onClickTrip = (id: string) => {
    navigate(`/trip/${id}`);
  };

  const clearSearch = () => {
    navigate(`/home`);
  };

  if (isLoading) {
    return (
      <Center
        style={{ height: '100vh' }}
      >
        <Flex
          direction="column"
          align="center"
          gap="md"
        >
          <Loader size="lg" />
          <Text>
            Loading trip details...
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <>
      {isSearchResults && (
        <Container
          size="xl"
          mt="md"
          pb="md"
        >
          <Group p="apart">
            <Group>
              <Text fw={500} size="lg">
                Search Results
              </Text>
              <Badge>
                {trips.length} trips
                found
              </Badge>
            </Group>
            <Text
              c="blue"
              style={{
                cursor: 'pointer',
              }}
              onClick={clearSearch}
            >
              Clear search
            </Text>
          </Group>
        </Container>
      )}

      {trips.length === 0 &&
        (isSearchResults ? (
          <EmptyCard
            msg="No trips found matching your search..."
            buttonMsg="Clear search"
            onButtonClick={clearSearch}
          />
        ) : (
          <EmptyCard
            msg="Looks like you don't have any trip..."
            buttonMsg="Create your first trip"
          />
        ))}

      <Container size="xl">
        <Grid gutter="xl">
          {trips.map((trip) => (
            <Grid.Col
              key={trip.id}
              span={4}
            >
              <TripCard
                trip={trip}
                onClick={onClickTrip}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
