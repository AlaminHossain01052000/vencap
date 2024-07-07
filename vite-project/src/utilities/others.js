const categoryToCorrespondingIcon={
    "none":"",
    "agriculture":"fas fa-tractor",
    "technology":"fas fa-microchip",
    "healthcare":"fas fa-habd-holding-medical",
    "finance":"fas fa-piggy-bank",
    "real state":"fas fa-city",
    "others":"fas fa-infinity" 
  
  
  }
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  export {categoryToCorrespondingIcon,currencyFormatter}