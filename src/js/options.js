const raw = document.getElementById('raw');
const formatted = document.getElementById('formatted');
const cookie = document.getElementById('cookie');
const types = document.querySelectorAll('input[name="type"]');

String.prototype.toTitleCase = function () {
    return this.split('-').map(v => {
        if (v.length < 2) {
            return v.toUpperCase();
        }
        return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
    }).join('-');
};

const change = () => {
    const type = document.querySelector('input[name="type"]:checked').value;

    let separator = '';
    formatted.value = raw.value.split('\n').map((v) => {
        if (/.+\t.+/.test(v.toString())) {
            separator = '\t';
        } else if (/.+:.+/.test(v.toString())) {
            separator = ':';
        } else if (/.+\s.+/.test(v.toString())) {
            separator = ' ';
        } else {
            return;
        }

        let key = v.slice(0, v.indexOf(separator));
        switch (type) {
            case 'default':
                break;
            case 'lower':
                key = key.toLowerCase();
                break;
            case 'upper':
                key = key.toUpperCase();
                break;
            case 'title':
                key = key.toTitleCase();
                break;
            default:
        }

        return [
            key,
            v.slice(v.indexOf(separator) + 1).trim()
        ].map((vv) => {
            return "'" + vv + "'";
        }).join(': ');
    }).filter((v) => {
        return v;
    }).join(',\n') + ',\n';

    const cookies = raw.value.split('\n').map((v) => {
        return /cookie/i.test(v.toString()) ? v : false;
    }).filter((v) => {
        return v;
    })[0];

    if (!cookies) {
        return;
    }

    cookie.value = cookies.split(separator)[1].split(';').map((v) => {
        return v.split('=');
    }).map((v) => {
        let key = v[0].trim();
        switch (type) {
            case 'default':
                break;
            case 'lower':
                key = key.toLowerCase();
                break;
            case 'upper':
                key = key.toUpperCase();
                break;
            case 'title':
                key = key.toTitleCase();
                break;
            default:
        }
        return ["'" + key + "'", "'" + v.slice(1).join('=') + "'"].join(': ');
    }).join(',\n') + ',\n';
};

types.forEach(v => {
    v.onclick = () => {
        change();
    };
});
raw.onchange = () => {
    change();
};