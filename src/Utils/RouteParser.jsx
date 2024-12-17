export default function RouteParser(routeConf) {
    return routeConf.split(',').reduce((acc, pair) => {
      // Split the key-value pair and trim spaces
      const [key, value] = pair.split(':').map(item => item.trim());
  
      // Remove leading/trailing quotes if present (for strings)
      let cleanedValue = value;
      if (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
        cleanedValue = cleanedValue.slice(1, -1);  // Remove quotes
      }
  
      // Handle special cases for JSX or booleans
      if (cleanedValue === 'true') {
        acc[key] = true;
      } else if (cleanedValue === 'false') {
        acc[key] = false;
      }  else {
        // For all other values, just assign the cleaned value
        acc[key] = cleanedValue;
      }
  
      return acc;
    }, {});
  }