( function() {
    var DIVISI_MATH = DIVISI.math;

    function Transposer( map, filter ) {
        if ( filter === false ) {
            DIVISI.Node.call( this );
        }
        else {
            DIVISI.NoteNode.call( this );
        }

        this.map = DIVISI.utils.ensureMapLength( map );
    };

    Transposer.prototype = Object.create( DIVISI.Node.prototype );


    Transposer.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }

        message.data[ 1 ] += this.map[ DIVISI_MATH.getOctaveIndex( message.data[ 1 ] ) ];
        message.data[ 1 ] = DIVISI_MATH.clamp( message.data[ 1 ], 0, 127 );

        this.trigger( 'message:post', message );
    };



    DIVISI.Transposer = Transposer;

    DIVISI.createTransposer = function( map, filter ) {
        return new Transposer( map, filter );
    };
}() );