global.env = "LOCAL";

function setEnvironmentSpecifics(env) {
    switch (env) {
        case 'LOCAL':
            global.mongoUrl = 'mongodb://localhost:27017/';
            global.db = "";
            break;
        case 'STAGE':
            global.mongoUrl = 'mongodb://52.163.63.199:5015/';
            global.db = "";
            break;
        case 'PROD':
            global.db = "";
            global.mongoUrl = 'mongodb://db.realbox.in:29004/';
            break;
    }
}

setEnvironmentSpecifics(global.env);