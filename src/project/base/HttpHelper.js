export class HttpHelper {
    static formatParams(params, callback) {
        let formData = [];
        const undefinedKeys = [];

        for (const property in params) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(params[property]);

            if (params[property] === undefined || typeof (params[property]) === 'undefined') {
                undefinedKeys.push(property);
                continue;
            }

            if (params[property] && params[property].constructor && params[property].constructor === Array) {
                const arrayValue = params[property];
                for (const arrayValueEle of arrayValue) {
                    formData.push(encodedKey + "=" + encodeURIComponent(arrayValueEle));
                }
            } else {
                formData.push(encodedKey + "=" + encodedValue);
            }
        }

        callback({formData: formData, undefinedKeys: undefinedKeys});
    }

    static post(url, params, success, failed) {
        this.formatParams(params, (formatParam) => {
            fetch(url, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                },
                body: formatParam.formData
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then((data) => {
                if (data.code === 0 && success) {
                    success(data);
                }
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    static get(url, params, success, failed) {
        this.formatParams(params, (formatParam) => {
            if (formatParam.formData) {
                url += "?" + formatParam.formData;
            }
            fetch(url, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'text/plain',
                },
                timeout: 10000,
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            }).then((data) => {
                if (data.code === 0 && success) {
                    success(data);
                }
            }).catch((e) => {
                console.log(e);
            });
        });
    }

    static getText(url, params, success, failed) {
        this.formatParams(params, (formatParam) => {
            if (formatParam.formData) {
                url += "?" + formatParam.formData;
            }
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'text/plain; charset=UTF-8');
            myHeaders.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
            fetch(url, {
                method: 'GET',
                credentials: "include",
                headers: myHeaders,
                timeout: 10000,
            }).then((res) => {
                if (res.ok) {
                    return res.text();
                }
            }).then((data) => {
                success(data);
            }).catch((e) => {
                console.log(e);
            });
        });
    }
}
