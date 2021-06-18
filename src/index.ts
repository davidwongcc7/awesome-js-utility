import merge from 'deepmerge-plus';

export const sleep = async (time: number): Promise<unknown> => {
    return new Promise((resolve) => setTimeout(resolve, time));
};

export const execShellCommand = (cmd: string) => {
    const exec = require('child_process').exec;
    return new Promise((resolve) => {
        exec(cmd, (error: any, stdout: string, stderr: string) => {
            if (error) {
                return resolve(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
};

export const escapeSpecialChars = (keyword: string): string => {
    // eslint-disable-next-line no-useless-escape
    return keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export const round = (value: number, precision: number) => {
    const multiplier = Math.pow(10, precision || 0);
    return (Math.round(value * multiplier) / multiplier).toFixed(precision);
};

export const roundToDecimal = (value: number, precision = 2): string => {
    const temp = parseFloat(round(value, precision + 1)) + 0.000000001;
    return round(temp, precision);
};

export const getRandomKey = (
    length = 8,
    charset: string | 'a-z' | 'A-Z' | 'default' | 'base32' = 'default',
): string => {
    // charset can be a-z, A-Z, 0-9, or base32 (A-Z and 2-7) or manually enter charset
    // default a-zA-Z0-9

    return require('rand-token')
        .generator({
            chars: charset,
        })
        .generate(length);
};

export const restrictQuery = (queryObject: Record<string, any>): Record<string, string> => {
    const result: Record<string, string> = {};
    const queries = Object.entries(queryObject);

    queries.forEach(([key, value]) => {
        if (typeof value !== 'string') {
            throw new Error('query consist of non string query');
        }

        result[key] = value;
    });

    return result;
};

export const isInternetExplorer = (userAgent = ''): boolean => {
    const ua = userAgent;
    const msie = ua.indexOf('MSIE ');

    if (msie > 0 || !!userAgent.match(/Trident.*rv\:11\./)) {
        // If Internet Explorer, return version number
        return true;
    } // If another browser, return 0
    else {
        return false;
    }
};

export const isSafari = () => {
    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent); 
};

const overwriteMerge = (destinationArray: any, sourceArray: any, options: any) => sourceArray;

export const mergeObjectWithArrayOverWrite = (...data: Record<string, unknown>[]) => {
    return merge.all([...data], { arrayMerge: overwriteMerge });
};

export const checkUnModifiedFields = (originalObject: Record<string, unknown>, newData: Record<string, unknown>) => {
    const result = JSON.parse(JSON.stringify(newData));

    Object.keys(result).forEach((key) => {
        if (JSON.stringify(originalObject[key]) === JSON.stringify(newData[key])) {
            delete result[key];
        }
    });

    return result;
};

export const trimArray = (arrayData: unknown[], reserveNumber: number) => {
    if (arrayData.length > reserveNumber) {
        arrayData = arrayData.filter((item, index) => {
            if (index < reserveNumber) {
                return true;
            } else {
                return false;
            }
        });
    }

    return arrayData;
};
