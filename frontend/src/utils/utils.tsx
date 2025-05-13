const formatDate = (
  date: string | Date
) => {
  return new Intl.DateTimeFormat(
    'en-UK',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Europe/Berlin',
    }
  ).format(new Date(date));
};

const calculateNights = (
  startDate: Date,
  endDate: Date | number
) => {
  const start = new Date(
    startDate
  ).getTime();
  const end = new Date(
    endDate
  ).getTime();
  const millisecondsPerDay =
    1000 * 60 * 60 * 24;
  return Math.ceil(
    (end - start) / millisecondsPerDay
  );
};

export { formatDate, calculateNights };
