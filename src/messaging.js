// Do I even need the buffer pool!?
// I can just have straight-up byte0, byte1, byte2 props,
// or even a normal array in the InternalMessagePool object.
// DIVISI._bufferPool = new BufferPool( Uint8Array, DIVISI.messagePoolSize, 3 );
// DIVISI._messagePool = new InternalMessagePool( DIVISI._bufferPool );
DIVISI._messagePool = new DIVISI.MessagePool( DIVISI.messagePoolSize );

DIVISI.createMessage = function( settings ) {
    var command = ( settings && settings.command ) || 0,
        channel = ( settings && settings.channel ) || 0,
        byte1 = ( settings && settings.byte1 ) || 0,
        byte2 = ( settings && settings.byte2 ) || 0,
        receivedTime = ( settings && settings.receivedTime ) || performance.now(),
        timestamp = ( settings && settings.timestamp ) || Date.now(),
        message = DIVISI._messagePool.get(),

        msgCommand = command,
        msgByte1 = 0,
        msgByte2 = 0;

    if ( DIVISI.utils.commandHasChannel( command | 0 ) ) {
        msgCommand = command + channel;
    }

    // TODO:
    // 	- Make sure value adheres to spec range.
    // 	  Some CC commands need either 0 OR 127, nothing in between.
    if ( DIVISI.utils.commandHasByte1( command | 0 ) ) {
        msgByte1 = byte1;
    }

    if ( DIVISI.utils.commandHasByte2( command | 0, byte1 | 0 ) ) {
        msgByte2 = byte2;
    }

    message.data[ 0 ] = msgCommand;
    message.data[ 1 ] = DIVISI.math.clamp( msgByte1, 0, 127 );
    message.data[ 2 ] = DIVISI.math.clamp( msgByte2, 0, 127 );

    // message.byte0Fract = DIVISI.math.fract( command );
    // message.byte1Fract = DIVISI.math.fract( byte1 );
    // message.byte2Fract = DIVISI.math.fract( byte2 );

    message.receivedTime = receivedTime;
    message.timestamp = timestamp;

    return message;
};

DIVISI.createRawMessage = function( settings ) {
    return DIVISI.utils.toMIDIMessageEvent( DIVISI.createMessage( settings ) );
};

DIVISI.releaseMessage = function( message ) {
    DIVISI._messagePool.release( message );
};