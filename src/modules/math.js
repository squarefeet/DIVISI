DIVISI.math = {

    nearestNumberInArray: function( number, array ) {
        var mid,
            low = 0,
            high = array.length - 1;

        while ( high - low > 1 ) {
            mid = Math.floor( ( low + high ) * 0.5 );

            if ( array[ mid ] < number ) {
                low = mid;
            }
            else {
                high = mid;
            }
        }

        if ( number - array[ low ] <= array[ high ] - number ) {
            return array[ low ];
        }

        return array[ high ];
    },

    // Assumes array argument is pre-sorted.
    minDifferenceInArray: function( array ) {
        var minDiff = array[ 1 ] - array[ 0 ];

        for ( var i = 2, il = array.length; i < il; ++i ) {
            minDiff = Math.min( minDiff, array[ i ] - array[ i - 1 ] );
        }

        return minDiff;
    },

    byteToBinary: function( byte, significance ) {
        var binary = byte.toString( 2 );

        // for ( var i = 0; i < 8; ++i ) {
        //     if ( binary.length === 8 ) {
        //         return binary;
        //     }

        //     if ( significance === DIVISI.constants.LSB ) {
        //         binary = '0' + binary;
        //     }
        //     else {
        //         binary += '0';
        //     }
        // }

        return binary;
    },

    roundFromEpsilon: function( n ) {
        var rounded = Math.round( n );

        if ( rounded % n < DIVISI.epsilon ) {
            return rounded
        }
        else {
            return n;
        }
    },

    roundToMultiple: function( n, multiple ) {
        var fract = this.fract( multiple ),
            reciprocal,
            result;

        if ( fract !== 0 ) {
            reciprocal = fract !== 0 ? 1 / fract : 1;
            n *= reciprocal;
        }

        result = Math.floor( ( n + multiple - 1 ) / multiple ) * multiple;

        if ( fract !== 0 ) {
            result /= reciprocal;
        }

        return result;
    },

    roundTo: function( n, value ) {
        var fract = this.fract( value ),
            reciprocal = 1,
            result;

        if ( fract !== 0 ) {
            reciprocal = 1 / fract;
        }

        result = Math.round( n * reciprocal ) / reciprocal;

        return result;
    },

    clamp: function( value, min, max ) {
        return Math.min( max, Math.max( value, min ) );
    },

    scaleNumber: function( num, lowIn, highIn, lowOut, highOut ) {
        return ( ( num - lowIn ) / ( highIn - lowIn ) ) * ( highOut - lowOut ) + lowOut;
    },

    scaleNumberExp: function( num, lowIn, highIn, lowOut, highOut, exp ) {
        if ( typeof exp !== 'number' || exp === 1 ) {
            return this.scaleNumber( num, lowIn, highIn, lowOut, highOut );
        }

        if ( ( num - lowIn ) / ( highIn - lowIn ) === 0 ) {
            return lowOut;
        }
        else {
            if ( ( num - lowIn ) / ( highIn - lowIn ) > 0 ) {
                return ( lowOut + ( highOut - lowOut ) * Math.pow( ( num - lowIn ) / ( highIn - lowIn ), exp ) );
            }
            else {
                return ( lowOut + ( highOut - lowOut ) * -( Math.pow( ( ( -num + lowIn ) / ( highIn - lowIn ) ), exp ) ) );
            }
        }
    },

    fract: function( n ) {
        return n - ( n | 0 );
    },

    applySaturation: function( value, drive ) {
        // value = -value;
        return ( 3 + drive ) * value * 57 * ( Math.PI / 180 ) / ( Math.PI + drive * Math.abs( value ) );
    },

    /**
     * Given a MIDI note number from 0 - 127, return
     * a number from 0 - 11 indicating the note's index
     * in an octave (octave defined as C to B, where C is 0
     * and B is 11)
     *
     * @param  {Number} midiNoteNumber The MIDI note number to operate on.
     * @return {Number}                Note's index in octave.
     */
    getOctaveIndex: function( midiNoteNumber ) {
        return midiNoteNumber % 12;
    },

    //
    // Conversion functions
    //

    // Hz values to *
    hzToMIDI: function( value ) {
        return this.roundFromEpsilon( 69 + 12 * Math.log2( value / 440 ) );
    },

    hzToNote: function( value ) {
        return this.midiToNote( this.hzToMIDI( value ) );
    },

    hzToMs: function( value ) {
        if ( value === 0 ) return 0;
        return 1000 / value;
    },

    hzToBPM: function( value ) {
        return this.msToBPM( this.hzToMs( value ) );
    },


    // MIDI values to *
    midiToHz: function( value ) {
        return Math.pow( 2, ( value - 69 ) / 12 ) * 440;
    },

    midiToNote: function( value ) {
        var values = ( value + '' ).split( '.' ),
            noteValue = +values[ 0 ],
            cents = ( values[ 1 ] ? parseFloat( '0.' + values[ 1 ], 10 ) : 0 ) * 100;

        if ( Math.abs( cents ) >= 100 ) {
            noteValue += cents % 100;
        }

        var root = noteValue % 12 | 0,
            octave = noteValue / 12 | 0,
            noteName = DIVISI.noteStrings[ root ];

        return noteName + ( octave + DIVISI.lowestOctave ) + ( cents ? '+' + cents : '' );
    },

    midiToMs: function( value ) {
        return this.hzToMs( this.midiToHz( value ) );
    },

    midiToBPM: function( value ) {
        return this.msToBPM( this.midiToMs( value ) );
    },


    // Note string values to *
    noteToHz: function( value ) {
        return this.midiToHz( this.noteToMIDI( value ) );
    },

    // TODO:
    //  - When giving 'B#2' as value, it rounds DOWN to C2.
    //    Should round to nearest, which would be C3.
    noteToMIDI: function( value ) {
        var matches = DIVISI.noteRegExp.exec( value ),
            note, accidental, octave, cents,
            noteValue;

        if ( !matches ) {
            console.warn( 'Invalid note format:', value );
            return;
        }

        note = matches[ 1 ];
        accidental = matches[ 2 ];
        octave = ( parseInt( matches[ 3 ], 10 ) || DIVISI.lowestOctave ) + -DIVISI.lowestOctave;
        cents = parseFloat( matches[ 4 ] ) || 0;

        var noteValue = DIVISI.noteStringsNoAccidentals[ note ],
            accidentalValue = DIVISI.accidentalValues[ accidental ],
            transposedValue = noteValue + accidentalValue;

        if ( transposedValue < 0 ) {
            octave -= 1;
            transposedValue = 12 + transposedValue;
        }
        else if ( transposedValue > 11 ) {
            octave += 1;
            transposedValue = transposedValue % 12;
        }

        return DIVISI.math.roundFromEpsilon( transposedValue + ( octave * 12 ) + ( cents * 0.01 ) );
    },

    noteToMs: function( value ) {
        return this.midiToMs( this.noteToMIDI( value ) );
    },

    noteToBPM: function( value ) {
        return this.midiToBPM( this.noteToMIDI( value ) );
    },


    // Millisecond values to *
    msToHz: function( value ) {
        return this.hzToMs( value );
    },

    msToNote: function( value ) {
        return this.midiToMs( this.noteToMIDI( value ) );
    },

    msToMIDI: function( value ) {
        return this.hzToMIDI( this.msToHz( value ) );
    },

    msToBPM: function( value ) {
        return value === 0 ? 0 : 60000 / value;
    },


    // BPM values to *
    bpmToHz: function( value ) {
        return this.msToHz( this.bpmToMs( value ) );
    },

    bpmToNote: function( value ) {
        return this.midiToBPM( this.noteToMIDI( value ) );
    },

    bpmToMIDI: function( value ) {
        return this.msToMIDI( this.bpmToMs( value ) );
    },

    bpmToMs: function( value ) {
        return this.msToBPM( value );
    }
};