var DIVISI = {
    // Version number
    revision: '1',

    // The size of the internal message pool.
    //
    // All internal message data sits within one
    // Uint8Array.
    //
    // When a message is requested, that section of
    // the array's buffer is returned.
    //
    // When a message is finished with, it's returned
    // to the pool.
    messagePoolSize: 500,

    // Global tuning control. Measured in cents.
    tuning: 0,

    // A flag to indicate whether MIDI access is supported
    // when this library is run.
    supported: typeof navigator.requestMIDIAccess === 'function',

    // Used when converting note strings (eg. 'A#4') to MIDI values.
    // It's the octave number of the lowest C note (MIDI note 0).
    // Change this if you're used to a DAW that doesn't use -2 as the
    // lowest octave.
    //
    // Set to -1 to adhere to Scienticic pitch notation.
    // 	- https://en.wikipedia.org/wiki/Scientific_pitch_notation
    //
    // Useful values:
    // 	- A2 as 440Hz: -3
    // 	- A3 as 440Hz: -2
    // 	- A4 as 440Hz: -1
    // 	- A5 as 440hz: 0.
    // 	- etc.
    lowestOctave: -2,

    // Lowest allowed number. Used by some DIVISI.Math
    // functions, especially when converting between
    // number formats (ie. hz -> MIDI, note -> MIDI, etc. )
    epsilon: 0.001,

    // A regular expression to match against note strings (such as "A#3+12": A sharp, 3rd octave, plus 12 cents)
    noteRegExp: /^([A|B|C|D|E|F|G]{1})([#bx]{0,2})([\-\+]?\d+)?([\+|\-]{1}\d*.\d*)?/,

    // An array of values to reference when converting to note strings.
    noteStrings: [ 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ],

    noteStringsNoAccidentals: {
        'C': 0,
        'D': 2,
        'E': 4,
        'F': 5,
        'G': 7,
        'A': 9,
        'B': 11
    },

    accidentalValues: {
        '##': 2,
        '#': 1,
        '': 0,
        'b': -1,
        'bb': -2,
        'x': -2
    },

    // A map of note names and their respective values.
    noteValues: {
        'C': 0,
        'Dbb': 0,
        'B#': 0,

        'C#': 1,
        'Db': 1,
        'B##': 1,
        'Bx': 1,

        'D': 2,
        'Ebb': 2,
        'C##': 2,
        'Cx': 2,

        'D#': 3,
        'Eb': 3,
        'Fbb': 3,

        'E': 4,
        'Fb': 4,
        'D##': 4,
        'Dx': 4,

        'F': 5,
        'Gbb': 5,
        'E#': 5,

        'F#': 6,
        'Gb': 6,
        'E##': 6,
        'Ex': 6,

        'G': 7,
        'Abb': 7,
        'F##': 7,
        'Fx': 7,

        'G#': 8,
        'Ab': 8,

        'A': 9,
        'Bbb': 9,
        'G##': 9,
        'Gx': 9,

        'A#': 10,
        'Bb': 10,
        'Cbb': 10,

        'B': 11,
        'Cb': 11,
        'A##': 11,
        'Ax': 11
    }
};



if ( typeof define === 'function' && define.amd ) {
    define( 'divisi', DIVISI );
}
else if ( typeof exports !== 'undefined' && typeof module !== 'undefined' ) {
    module.exports = DIVISI;
}