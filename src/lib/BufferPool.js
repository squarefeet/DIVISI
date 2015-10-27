function BufferPool( ArrayConstructor, size, componentSize ) {
    this.size = size;
    this.componentSize = componentSize;
    this.ArrayConstructor = ArrayConstructor;
    this.array = new ArrayConstructor( size * componentSize );
    this.usedIndex = 0;
}

BufferPool.prototype.getAtIndex = function( index ) {
    return this.array[ index * this.componentSize ];
};

BufferPool.prototype.setAtIndex = function( index ) {
    var i = 0,
        offset = index * this.componentSize,
        array = this.array;

    for ( i; i < arguments.length; ++i ) {
        array[ offset + i ] = arguments[ i + 1 ];
    }

    return this;
};

BufferPool.prototype.setArrayAtIndex = function( index, src ) {
    var i = 0,
        offset = index * this.componentSize,
        srcLength = src.length,
        destination = this.array,
        componentSize = this.componentSize;

    for ( var i = 0; i < srcLength; ++i ) {
        destination[ offset + i ] = src[ i ];
    }
};

BufferPool.prototype.getArrayAtIndex = function( index, length ) {
    var l = typeof length === 'number' ? length : this.componentSize,
        start = index * this.componentSize,
        end = start + l;

    return this.array.subarray( start, end );
};

BufferPool.prototype.get = function() {
    if ( this.usedIndex === this.size ) {
        console.error( 'BufferPool ran out.' );
        return;
    }

    var instance = this.getArrayAtIndex( this.usedIndex ),
        args = arguments,
        count = Math.min( args.length, instance.length );

    if ( count ) {
        for ( var i = 0; i < count; ++i ) {
            instance[ i ] = args[ i ];
        }
    }

    ++this.usedIndex;

    return instance;
};

BufferPool.prototype.release = function( array ) {
    this.setArrayAtIndex( this.usedIndex, array );
    --this.usedIndex;
};