var xoauth2 = require("xoauth2"), xoauth2gen;
var ResumableUpload = require('node-youtube-resumable-upload');
var pick = require('object.pick');

module.exports = {
    upload: function(settings, onSuccess, onFail, onProgress){
        
        var xoauth2gen = xoauth2.createXOAuth2Generator({
            user: settings.auth.email,
            clientId: settings.auth.clientId,
            clientSecret: settings.auth.clientSecret,
            refreshToken: settings.auth.refreshToken
        })

        var snippet = pick(settings.video, ['title','description','tags','categoryId'])
        var state = pick(settings.video, ['privacyStatus','embeddable','license']);

        var retry = (settings.retry !== undefined) ? settings.retry : 3;
        
        if(onSuccess === undefined) onSuccess = function(success){ console.log(success) };
        if(onProgress === undefined) onProgress = function(progress){ console.log(progress) };
        if(onFail === undefined) onFail = function(fail){ console.log(fail) };
    
        xoauth2gen.getToken(function(err, token, accessToken){
            if(err){ return console.log(err); }

            var resumableUpload = new ResumableUpload(); //create new ResumableUpload 
            resumableUpload.tokens = {
                "access_token": accessToken,
                "token_type": "Bearer", 
                // "expires_in": 3600, 
                "refresh_token": settings.auth.refreshToken
            }; //Google OAuth2 tokens 

            resumableUpload.filepath = settings.video.filepath;

            resumableUpload.metadata = {
                snippet: snippet,
                status: state
            };

            resumableUpload.retry = retry; // Maximum retries when upload failed. 
            resumableUpload.upload();

            resumableUpload.on('progress', onProgress);

            resumableUpload.on('success', onSuccess);

            resumableUpload.on('error', onFail);

        });
    }
}
