var env = 'LOCAL';
var appUrl;

function setEnvironmentSpecifics(env) {
    switch (env) {

        case 'LOCAL':
            appUrl = window.location.origin + '/';
            break;

        case 'STAGE':
            appUrl = window.location.origin + '/';
            break;

        case 'PROD':
            appUrl = window.location.origin + '/';
            break;

    }
    console.log(appUrl);
}
setEnvironmentSpecifics(env);
