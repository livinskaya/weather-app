interface Location {
    latitude: number;
    longitude: number;
}

export const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            const error = new Error("Geolocation is not supported");
            reject(error)
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (GeolocationPosition) => {
                const latitude = GeolocationPosition.coords.latitude;
                const longitude = GeolocationPosition.coords.longitude;
                resolve({ latitude, longitude });
            },
            (error) => {
                console.error("Unknown location")
                reject(error)
            }
        )

    })

}