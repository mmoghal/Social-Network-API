const formatDate = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const options = { month: monthLength };
    if (dateSuffix) options.day = 'numeric';
  
    const formattedTimeStamp = new Date(timestamp).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      ...options,
    });
  
    return formattedTimeStamp;
  };
  
  module.exports = formatDate;
  