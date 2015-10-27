( function() {
    function MessagePool( size ) {
        // this.bufferPool = bufferPool;
        this.size = size;
        this.pool = [];
        this.fill();
    };

    MessagePool.prototype.createSingleMessage = function() {
        return new DIVISI.Message();
    };

    MessagePool.prototype.fill = function() {
        // var size = this.bufferPool.size;

        for ( var i = 0; i < this.size; ++i ) {
            this.pool.push( this.createSingleMessage() );
        }
    };

    MessagePool.prototype.get = function() {
        var message = this.pool.pop();
        return message;
    };

    MessagePool.prototype.resetMessage = function( message ) {
        if ( message instanceof DIVISI.Message === false ) {
            console.error( 'Attempted to reset invalid message.' );
            return;
        }

        var data = message.data;

        data[ 0 ] = 0;
        data[ 1 ] = 0;
        data[ 2 ] = 0;
        message.byte0Fract = 0.0;
        message.byte1Fract = 0.0;
        message.byte2Fract = 0.0;
        message.receivedTime = 0.0;
        message.timestamp = 0;
    };

    MessagePool.prototype.release = function( message ) {
        if ( message instanceof DIVISI.Message === false ) {
            console.error( 'Attempted to release invalid message format.' );
            return;
        }

        this.resetMessage( message );
        this.pool.push( message );
    };

    DIVISI.MessagePool = MessagePool;
}() );