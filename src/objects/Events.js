DIVISI.Events = function() {
    this._listeners = {};
};


DIVISI.Events.prototype.on = function( name, fn ) {
    this._listeners[ name ] = this._listeners[ name ] || [];
    this._listeners[ name ].push( fn );
};

DIVISI.Events.prototype.off = function( name, fn ) {
    var index;

    if ( this._listeners[ name ] ) {
        index = this._listeners[ name ].indexOf( fn );

        if ( index > -1 ) {
            this._listeners[ name ].splice( 1, index );
        }
        else {
            this._listeners[ name ].length = 0;
        }
    }
};

DIVISI.Events.prototype.trigger = function( name ) {
    var fns = this._listeners[ name ],
        args = Array.prototype.slice.call( arguments, 1 );

    if ( fns && fns.length ) {
        for ( var i = 0, il = fns.length; i < il; ++i ) {
            fns[ i ].apply( fns[ i ], args );
        }
    }
};