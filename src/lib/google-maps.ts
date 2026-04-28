export async function getCoordsFromEircode(eircode: string) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const query = encodeURIComponent(`${eircode.trim()}, Ireland`);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if(data.status === 'OK') {
            const result = data.results[0];
            return {
                lat: result.geometry.location.lat,
                lng: result.geometry.location.lng,
                address: result.formatted_address
            };
        }
        return null;
    } catch (error) {
        console.log("Error fetching coordinates:", error);
    }
}