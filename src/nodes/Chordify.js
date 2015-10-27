( function() {

    var MATH = Math,
        DIVISI_MATH = DIVISI.math,
        DIVISI_UTILS = DIVISI.utils,

        min = MATH.min;

    function Chordify( settings ) {
        settings = settings || {};

        if ( settings.filter === false ) {
            DIVISI.Node.call( this );
        }
        else {
            DIVISI.NoteNode.call( this );
        }

        this.chordMap = DIVISI_UTILS.ensureMapLength( Array.isArray( settings.chord[ 0 ] ) ? settings.chord : [ settings.chord ] );
        this.inversion = settings.inversion || 0;
    };

    Chordify.prototype = Object.create( DIVISI.Node.prototype );

    Chordify.prototype.getInversion = function( chord ) {
        var inversion = min( chord.length - 1, this.inversion );

        for ( var i = 0; i < inversion; ++i ) {
            chord[ i ] += 12;
        }
    };

    Chordify.prototype.resetInversion = function( chord ) {
        var inversion = min( chord.length - 1, this.inversion );

        for ( var i = 0; i < inversion; ++i ) {
            chord[ i ] -= 12;
        }
    };

    Chordify.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }

        var noteValue = message.data[ 1 ],
            noteIndex = DIVISI_MATH.getOctaveIndex( noteValue ),
            chord = this.chordMap[ noteIndex ],
            msg;

        if ( this.inversion !== 0 ) {
            this.getInversion( chord );
        }

        for ( var i = chord.length - 1; i >= 0; --i ) {
            if ( i !== 0 ) {
                msg = DIVISI_UTILS.cloneMessage( message );
            }
            else {
                msg = message;
            }

            msg.data[ 1 ] += chord[ i ];
            msg.data[ 1 ] = DIVISI_MATH.clamp( msg.data[ 1 ], 0, 127 );
            this.trigger( 'message:post', msg );
        }


        if ( this.inversion !== 0 ) {
            this.resetInversion( chord );
        }
    };



    DIVISI.Chordify = Chordify;

    DIVISI.createChordify = function( settings ) {
        return new Chordify( settings );
    };

}() );