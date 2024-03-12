export const authEndpoint = "https://accounts.spotify.com/authorize";


const clientId = "20cdce8310bd486b8dcad7faae5f49e1";
const redirectUri = "https://spotify-clone-gamma-wheat.vercel.app/home";
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "user-library-read"
];

export const getTokenFromResponse = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            var parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1]);

            return initial;
        }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;