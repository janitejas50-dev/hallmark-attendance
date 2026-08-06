export function getCurrentLocation() {

    return new Promise((resolve, reject) => {

        if (!navigator.geolocation) {

            reject(new Error("Geolocation is not supported by this browser."));
            return;

        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                resolve({

                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    timestamp: position.timestamp

                });

            },

            (error) => {

                console.error("GPS Error:", error);

                reject(error);

            },

            {

                // Faster and more reliable indoors
                enableHighAccuracy: false,

                // Give the device more time if needed
                timeout: 30000,

                // Allow a recent cached position (up to 30 seconds old)
                maximumAge: 30000

            }

        );

    });

}