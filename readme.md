# Install
```
npm install youtup
```

# Usage
## Pre-coding
1. Create a project in [Google Console API](https://console.developers.google.com)
2. Enable YouTube Data API v3
3. Create credentials for OAuth client ID:
    - Choose "Web Application" for the application type.
    - Add "https://developers.google.com/oauthplayground" as redirect URI.
4. Get a Refresh Token from [OAuth Playground](https://developers.google.com/oauthplayground)

## Code
```javascript
youtup.upload({settings},onSuccess(res)*,onFail(res)*,onProgress(res)*)
```
Uploads a video to youtube channel.
- {settings}: The upload settings, including authentication parameters and video data.
    - {auth}: Authentication parameters.
        - "email": The channel email.
        - "clientId": The credentials client id.
        - "clientSecret": The credentials client secret.
        - "refreshToken": The refresh token you've got from oauth playground.
    - {video}: The video data.
        - "filepath": Path to video file.
        - "title": Youtube video title.
        - "description"*: Youtube video description.
        - ["tags"]*: Youtube video tags.
        - #categoryId*: -22- Youtube video category id
    - #retry*: -3- The number of upload retries.
- onSuccess()*: The function to run on success.
    - res: Response.
- onFail()*: The function to run on fail.
    - res: Response.
- onProgress()*: The function to run on progress.
    - res: Response.

Eg:
```javascript
var youtup = require('./')

var settings = {
    auth: {
        email: 'mission.tatwyr@gmail.com',
        clientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXcom',
        clientSecret: 'XXXXXXXXXXXXXXXXXXXXk3P7',
        refreshToken: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXPNcaPCm7Jzp7Ltk"
    },
    video: {
        filepath: 'video.mp4',
        title: 'youtup test',
        description: 'wanna test youtup in case it does not work',
        tags: ['tag1','tag2','tag3'],
        privacyStatus: 'private'
    }
}

youtup.upload(settings);
```
