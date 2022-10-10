const raw = document.getElementById('raw');
const formatted = document.getElementById('formatted');
const cookie = document.getElementById('cookie');
const types = document.querySelectorAll('input[name="type"]');
const quotationMarks = document.querySelectorAll('input[name="quotation-marks"]');

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
    const quotationMark = document.querySelector('input[name="quotation-marks"]:checked').value;

    let separator = '';
    formatted.value = raw.value.split('\n').map((v) => {
        v = v.trim();
        if (/.+\t.*/.test(v)) {
            separator = '\t';
        } else if (/.+:.*/.test(v)) {
            separator = ':';
        } else if (/.+\s.*/.test(v)) {
            separator = ' ';
        } else {
            return;
        }

        let a = v.indexOf(separator);
        let b = a + 1;
        if (v.charAt(0) === separator) {
            a = v.slice(1).indexOf(separator) + 1;
            b = a + 1;
        }

        let key = v.slice(0, a);
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
            v.slice(b).trim()
        ].map((vv) => {
            return quotationMark + vv + quotationMark;
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
        return [quotationMark + key + quotationMark, quotationMark + v.slice(1).join('=') + quotationMark].join(': ');
    }).join(',\n') + ',\n';
};

types.forEach(v => {
    v.onclick = () => {
        change();
    };
});
quotationMarks.forEach(v => {
    v.onclick = () => {
        change();
    };
});
raw.onchange = () => {
    change();
};