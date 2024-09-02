const useGetPostAge = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
  
    // Calculate the difference in time
    const diffTime = Math.abs(now - postDate);
  
    // Calculate differences in units
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffYears > 0) {
      return `${diffYears}y`;
    } else if (diffMonths > 0) {
      return `${diffMonths}m`;
    } else if (diffWeeks > 0) {
      return `${diffWeeks}w`;
    } else {
      return `${diffDays}d`;
    }
}

export default useGetPostAge
