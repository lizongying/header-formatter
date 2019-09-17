const text = document.getElementById('text');
const data = document.getElementById('data');
const cookie = document.getElementById('cookie');

text.onchange = () => {
    const type = parseInt(document.querySelector('input[name="type"]:checked').value);

    let separator = '';
    data.value = text.value.split('\n').map((v) => {
        if (/.+\t.+/.test(v)) {
            separator = '\t';
        } else if (/.+:.+/.test(v)) {
            separator = ':';
        } else {
            return;
        }
        return [
            type ? v.slice(0, v.indexOf(separator)).toLowerCase() : v.slice(0, v.indexOf(separator)),
            v.slice(v.indexOf(separator) + 1).trim()
        ].map((vv) => {
            return "'" + vv + "'";
        }).join(': ');
    }).filter((v) => {
        return v;
    }).join(',\n') + ',\n';

    const cookies = text.value.split('\n').map((v) => {
        return /cookie/i.test(v) ? v : false;
    }).filter((v) => {
        return v;
    })[0];

    if (!cookies) {
        return;
    }

    cookie.value = cookies.split(separator)[1].split(';').map((v) => {
        return v.split('=');
    }).map((v) => {
        return ["'" + (type ? v[0].trim().toLowerCase() : v[0].trim()) + "'", "'" + v.slice(1).join('=') + "'"].join(': ');
    }).join(',\n') + ',\n';
};