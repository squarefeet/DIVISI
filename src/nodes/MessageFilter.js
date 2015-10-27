( function() {

    var matchFilter = DIVISI.utils.matchFilter;

    function MessageFilter( filters ) {
        DIVISI.Node.call( this );
        this.filters = filters;
    };

    MessageFilter.prototype = Object.create( DIVISI.Node.prototype );

    MessageFilter.prototype.onmidimessage = function( message ) {
        var status = false;

        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }

        for ( var i = this.filters.length - 1; i >= 0; --i ) {
            if ( status === false ) {
                status = matcher( this.filters[ i ], message );
            }
        }

        message.ignore = !status;
        this.trigger( 'message:post', message );
    };


    DIVISI.MessageFilter = MessageFilter;

    DIVISI.createMessageFilter = function( filters ) {
        var filts = Array.isArray( filters ) ? filters : Array.prototype.slice.call( arguments );
        return new MessageFilter( filts );
    };
}() );