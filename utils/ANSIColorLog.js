export const COLORS = {
    uncolorize: (str) => str.replace(/\x1B\[\d+m/gi, ''),
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m', // bold
    italic: '\x1b[3m', // non-standard feature
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    fg: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        crimson: '\x1b[38m',
    },

    bg: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m',
        crimson: '\x1b[48m',
    },
};

const msg = extractMessage;
const extractMessage = (args) => {
    if (isTemplate(args)) return interlace(...args);
    return `${args[0]}`;
};

const isTemplate = (args) => {
    return args?.[0]?.raw;
};

const interlace = (strs, ...args) => {
    return strs.reduce(
        (prev, current, ix) => prev + (current ?? '') + (args[ix] ?? ''),
        '',
    );
};

/**
 * Colorize console output with these helper methods.
 * They can either be used as *tagged template literal* or as a *function*.
 *
 * @example
 * // Function call
 * red('received')
 * green(`Hi number ${five}`)
 *
 * // Tagged template literal
 * red`received`
 * green`Hi number ${five}`
 *
 * @example
 * `expect(${red`received`})${name}(${green`expected`})
 *
 * Expected: "${green(expected)}"
 * Received: "${red(actual)}"`
 */
export const dyeRed = (...message) =>
    COLORS.bg.red + COLORS.fg.black + msg(message) + COLORS.reset;
export const red = (...message) => COLORS.fg.red + msg(message) + COLORS.reset;
export const green = (...message) =>
    COLORS.fg.green + msg(message) + COLORS.reset;
