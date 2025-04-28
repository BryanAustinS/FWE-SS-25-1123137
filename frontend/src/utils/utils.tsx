const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('en-UK', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }).format(new Date(date));
  };

export { formatDate }