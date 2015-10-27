( function() {

    var DIVISI_MATH = DIVISI.math,
        round = Math.round,
        min = Math.min,
        abs = Math.abs,
        INCLUDE = DIVISI.constants.INCLUDE,
        EXCLUDE = DIVISI.constants.EXCLUDE,
        NEAREST_NEIGHBOUR = DIVISI.constants.NEAREST_NEIGHBOUR,
        UP = DIVISI.constants.UP,
        DOWN = DIVISI.constants.DOWN;


    function Scalify( settings ) {
        settings = settings || {};

        if ( settings.filter === false ) {
            DIVISI.Node.call( this );
        }
        else {
            DIVISI.NoteNode.call( this );
        }

        this.scale = settings.scale || DIVISI.scales.MAJOR;
        this.mode = settings.mode || INCLUDE;
        this.operation = settings.operation || NEAREST_NEIGHBOUR;
        this.root = settings.root ? DIVISI_MATH.getOctaveIndex( settings.root ) : 0;
    };

    Scalify.prototype = Object.create( DIVISI.Node.prototype );

    Scalify.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }


        var scale = this.scale,
            noteValue = message.data[ 1 ],
            noteIndex = DIVISI_MATH.getOctaveIndex( noteValue - this.root ),
            increment = DIVISI_MATH.minDifferenceInArray( this.scale ),
            scaleIndex,
            scaleValue,
            transposedNoteValue,
            i;


        if ( increment >= 1 ) {
            noteValue = round( noteValue );
            noteIndex = round( noteIndex );
        }

        transposedNoteValue = noteValue;
        scaleIndex = scale.indexOf( noteIndex );

        if ( scaleIndex === -1 && this.mode === EXCLUDE ) {
            return;
        }

        if ( scaleIndex === -1 ) {

            if ( this.operation === NEAREST_NEIGHBOUR ) {
                scaleValue = DIVISI_MATH.nearestNumberInArray( noteIndex, scale );
            }

            else if ( this.operation === UP ) {
                i = DIVISI_MATH.roundTo( noteIndex + increment, increment );

                while ( true ) {
                    i = i % 12;

                    if ( scale.indexOf( i ) > -1 ) {
                        scaleValue = i;
                        break;
                    }

                    i += min( increment, 1 );
                }
            }

            else if ( this.operation === DOWN ) {

                if ( DIVISI_MATH.fract( noteValue ) < increment ) {
                    i = noteValue | 0;
                }
                else {
                    i = increment;
                }

                while ( true ) {
                    i = abs( i % 12 );

                    if ( scale.indexOf( i ) > -1 ) {
                        scaleValue = i;
                        break;
                    }

                    i -= min( increment, 1 );
                }
            }

            transposedNoteValue = noteValue + ( scaleValue - noteIndex );
        }


        message.data[ 1 ] = DIVISI_MATH.clamp( transposedNoteValue, 0, 127 );

        this.trigger( 'message:post', message );
    };

    DIVISI.Scalify = Scalify;

    DIVISI.createScalify = function( settings ) {
        return new Scalify( settings );
    };

}() );