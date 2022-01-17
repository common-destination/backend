import moment from "moment";

export const flightsConditions = (fromRange, toRange, day, season) => {
  if (
    season === "May" ||
    season === "June" ||
    season === "July" ||
    season === "August" ||
    season === "September"
  ) {
    return day + 0.5;
  }

  return (
    toRange + fromRange >= 9 && day >= Math.round(Math.random() * (0 + 10))
  );
};

export const dayOfWeek = (dailydate) => {
  let dayInNum = dailydate.isoWeekday();
  if (dayInNum === 1) return "Monday";
  if (dayInNum === 2) return "Tuesday";
  if (dayInNum === 3) return "Wednesday";
  if (dayInNum === 4) return "Thursday";
  if (dayInNum === 5) return "Friday";
  if (dayInNum === 6) return "Saturday";
  if (dayInNum === 7) return "Sunday";
};

export const Month = (dailydate) => {
  let monthInNum = moment(dailydate).format("M");
  if (monthInNum === "1") return "January";
  if (monthInNum === "2") return "February";
  if (monthInNum === "3") return "March";
  if (monthInNum === "4") return "April";
  if (monthInNum === "5") return "May";
  if (monthInNum === "6") return "June";
  if (monthInNum === "7") return "July";
  if (monthInNum === "8") return "August";
  if (monthInNum === "9") return "September";
  if (monthInNum === "10") return "October";
  if (monthInNum === "11") return "November";
  if (monthInNum === "12") return "December";
};

export const purchasingSeason = (dailydate) => {
  let monthInNum = moment(dailydate).format("M");
  if (monthInNum === "1") return 0;
  if (monthInNum === "2") return 0;
  if (monthInNum === "3") return 0;
  if (monthInNum === "4") return 10;
  if (monthInNum === "5") return 15;
  if (monthInNum === "6") return 20;
  if (monthInNum === "7") return 30;
  if (monthInNum === "8") return 40;
  if (monthInNum === "9") return 25;
  if (monthInNum === "10") return 10;
  if (monthInNum === "11") return 5;
  if (monthInNum === "12") return 35;
};


export const getFlightDuration = (flightDuration) => {
  const hours = Math.floor(flightDuration);
  const flightDurationInMinutes = (flightDuration - hours) * 60;
  const minutes = Math.round(flightDurationInMinutes);
  return `${hours} ${hours === 1 ? "hour" : "hours"} and ${minutes} ${
    minutes === 1 ? "minute" : "minutes"
  }`;
}


export const departureDate2 = (arriveFirstFlight, addHour) => {
  return arriveFirstFlight.add(addHour, "hours");
};

export const arrival = (departureDate, howManyHours) => {
  return departureDate.add(howManyHours, "hours");
};

export const getFLightPrice = (percentage, flightDurationInHours) => {
  const normalPrice =
    15 + Math.floor(Math.random() * (flightDurationInHours * 120));
  return (normalPrice / 100) * percentage + normalPrice;
};
