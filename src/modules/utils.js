DIVISI.utils = {};

DIVISI.utils.messageToBinary = function( message ) {
    var data = message.data;

    return [
        DIVISI.math.byteToBinary( data[ 0 ] ),
        DIVISI.math.byteToBinary( data[ 1 ], DIVISI.constants.LSB ),
        DIVISI.math.byteToBinary( data[ 2 ] )
    ];
};

DIVISI.utils.toMIDIMessageEvent = function( message ) {
    var data = new Uint8Array( message.data );

    return new MIDIMessageEvent( 'midimessage', {
        data: data,
        receivedTime: message.receivedTime
    } );
};

DIVISI.utils.commandHasChannel = function( command ) {
    return command >= DIVISI.commands.NOTE_OFF && command <= DIVISI.commands.PITCH_BEND;
};

DIVISI.utils.commandHasByte1 = function( command ) {
    // All commands that support channels also support
    // use of byte1.
    return DIVISI.utils.commandHasChannel( command );

    // TODO:
    //  - After implenting more commands, make sure this is still
    //    correct.
    // if ( DIVISI.utils.commandHasChannel( command ) ) {
    //     return true;
    // }
    // else {
    // 	return false;
    // }
};

DIVISI.utils.commandHasByte2 = function( command, byte1 ) {
    var result =
        ( command === DIVISI.commands.CC && byte1 !== DIVISI.cc.DATA_INCREMENT && byte1 !== DIVISI.cc.DATA_DECREMENT ) ||
        ( command >= DIVISI.commands.NOTE_OFF && command < DIVISI.commands.CC ) ||
        ( command === DIVISI.commands.PITCH_BEND );

    return result;
};

DIVISI.utils.getMessageCommand = function( message ) {
    return message.data[ 0 ] & 0xf0;
};

DIVISI.utils.getMessageChannel = function( message ) {
    return message.data[ 0 ] & 0xf;
};

DIVISI.utils.matchFilter = function( filter, message ) {
    var data = message.data,
        command = DIVISI.utils.getMessageCommand( message ),
        channel = DIVISI.utils.getMessageChannel( message ),
        byte1 = data[ 1 ],
        byte2 = data[ 2 ],
        status = true;

    if ( filter.behaviour !== DIVISI.constants.PASS_THROUGH ) {
        status =
            ( command >= filter.commandStart && command <= filter.commandEnd ) &&
            ( channel >= filter.channelStart && channel <= filter.channelEnd ) &&
            ( byte1 >= filter.byte1Start && byte1 <= filter.byte1End ) &&
            ( byte2 >= filter.byte2Start && byte2 <= filter.byte2End );
    }

    if ( filter.behaviour === DIVISI.constants.EXCLUDE ) {
        status = !status;
    }

    return status;
};

DIVISI.utils.ensureMapLength = function( map, defaultValue ) {
    var m;

    if ( Array.isArray( map ) === false ) {
        m = [ map ];
    }
    else {
        m = map;
    }

    defaultValue = defaultValue || m[ 0 ];

    for ( var i = 0; i < 12; ++i ) {
        if ( m[ i ] === undefined ) {
            m[ i ] = defaultValue;
        }
    }

    return m;
};

DIVISI.utils.cloneMessage = function( source, destination ) {

    destination = destination || DIVISI.createMessage();

    for ( var prop in source ) {
        if ( prop === 'data' ) {
            destination.data[ 0 ] = source.data[ 0 ];
            destination.data[ 1 ] = source.data[ 1 ];
            destination.data[ 2 ] = source.data[ 2 ];
        }
        else {
            destination[ prop ] = source[ prop ];
        }
    }

    return destination;
};