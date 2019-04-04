const text = document.getElementById('text');
const data = document.getElementById('data');
const cookie = document.getElementById('cookie');

text.onchange = () => {
    data.value = text.value.split('\n').map((v) => {
        let c = '';
        if (/.+\t.+/.test(v)) {
            c = '\t';
        } else if (/.+:.+/.test(v)) {
            c = ':';
        } else {
            return;
        }
        return [
            v.slice(0, v.indexOf(c)).toLowerCase(),
            v.slice(v.indexOf(c) + 1).trim()
        ].filter((vv) => {
            return vv.length;
        }).map((vv) => {
            return "'" + vv + "'";
        }).join(': ');
    }).filter((v) => {
        return v;
    }).join(',\n');

    const cookies = text.value.split('\n').map((v) => {
        return /cookie/i.test(v) ? v : false;
    }).filter((v) => {
        return v;
    })[0];

    if (!cookies) {
        return;
    }

    cookie.value = cookies.split(':')[1].split(';').map((v) => {
        return v.split('=');
    }).map((v) => {
        return ["'" + v[0].trim().toLowerCase() + "'", "'" + v.slice(1).join('=') + "'"].join(': ');
    }).join(',\n');
};