( function() {
    function RoundRobin( nodes ) {
        DIVISI.Node.call( this );

        this.nodes = [];
        this._index = 0;

        for ( var i = 0; i < nodes.length; ++i ) {
            this.add( nodes[ i ] );
        }
    };

    RoundRobin.prototype = Object.create( DIVISI.Node.prototype );

    RoundRobin.prototype.onmidimessage = function( message ) {
        // this.trigger( 'message:pre', message );
        this.nodes[ this._index ].onmidimessage( message );

        if ( ( ++this._index ) === this.nodes.length ) {
            this.reset();
        }

        // this.trigger( 'message:post', message );
    };


    RoundRobin.prototype.add = function( node ) {
        if ( node instanceof DIVISI.Node === false ) {
            console.error( 'Incorrect node type.' );
            return;
        }

        this.nodes.push( node );
        return this;
    };

    RoundRobin.prototype.remove = function( node ) {
        var index = this.nodes.indexOf( node );

        if ( index === -1 ) {
            console.error( 'Node not present in store.' );
            return;
        }

        this.nodes.splice( index, 1 );
        return this;
    };

    RoundRobin.prototype.clear = function() {
        while ( this.nodes.length ) {
            this.nodes.pop();
        }
    };

    RoundRobin.prototype.reset = function() {
        this._index = 0;
    };


    DIVISI.RoundRobin = RoundRobin;

    DIVISI.createRoundRobin = function() {
        var nodes = Array.prototype.slice.call( arguments );
        return new RoundRobin( nodes );
    };
}() );