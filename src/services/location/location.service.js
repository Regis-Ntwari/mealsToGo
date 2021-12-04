import {locations} from './location.mock'

export const lcoationRequest = (searchTerm) => {
    return new Promise((resolve, reject) => {
        const locationMock = locations[searchTerm];
        if(!locationMock) {
            reject("location not Found")
        }
        resolve(locationMock)
    })
}

export const locationTransform = (result) => {
    console.log(result + "===");
    const {geometry = {}} = result.results[0]
    const {lat, lng} = geometry.location

    return {lat, lng, viewport : geometry.viewport}
}

