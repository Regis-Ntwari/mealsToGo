import { mocks, mockImages } from "./mock";

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  console.log(location);
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("location in restaurants not found");
    }
    resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restau) => {
    restau.photos = restau.photos.map((p) => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });
    return {
      ...restau,
      address: restau.vicinity,
      isOpenNow: restau.opening_hours && restau.opening_hours.open_now,
      isClosedTemporarily: restau.business_status === "CLOSED_TEMPORARILY",
    };
  });
  console.log(mappedResults);
  return mappedResults;
};
// restaurantsRequest()
//     .then(restaurantsTransform)
//     .then((transformedResponse) => {
//         console.log(transformedResponse);
//     })
//     .catch((err) => {
//     console.log(err);
// })
