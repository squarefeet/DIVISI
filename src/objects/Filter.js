( function() {
    function Filter( settings ) {
        var commandStart = 0,
            commandEnd = 0,
            channelStart = 0,
            channelEnd = 15,
            byte1Start = 0,
            byte1End = 127,
            byte2Start = 0,
            byte2End = 127,
            behaviour = DIVISI.constants.INCLUDE;

        if ( settings ) {
            commandStart = typeof settings.commandStart === 'number' ? settings.commandStart :
                typeof settings.command === 'number' ? settings.command :
                typeof settings.byte0Start === 'number' ? settings.byte0Start :
                typeof settings.byte0 === 'number' ? settings.byte0 :
                commandStart;

            commandEnd = typeof settings.commandEnd === 'number' ? settings.commandEnd :
                typeof settings.byte0End === 'number' ? settings.byte0End :
                commandStart;

            channelStart = typeof settings.channelStart === 'number' ? settings.channelStart :
                typeof settings.channel === 'number' ? settings.channel :
                channelStart;

            channelEnd = typeof settings.channelEnd === 'number' ? settings.channelEnd : channelStart;

            byte1Start = typeof settings.byte1Start === 'number' ? settings.byte1Start :
                typeof settings.byte1 === 'number' ? settings.byte1 :
                byte1Start;

            byte1End = typeof settings.byte1End === 'number' ? settings.byte1End :
                typeof settings.byte1Start === 'number' ? settings.byte1Start :
                typeof settings.byte1 === 'number' ? settings.byte1 :
                byte1End;

            byte2Start = typeof settings.byte2Start === 'number' ? settings.byte2Start :
                typeof settings.byte2 === 'number' ? settings.byte2 :
                byte2Start;

            byte2End = typeof settings.byte2End === 'number' ? settings.byte2End :
                typeof settings.byte2Start === 'number' ? settings.byte2Start :
                typeof settings.byte2 === 'number' ? settings.byte2 :
                byte2End;

            behaviour = typeof settings.behaviour === 'number' ? settings.behaviour : behaviour;
        }

        this.commandStart = Math.min( commandStart, commandEnd );
        this.commandEnd = Math.max( commandStart, commandEnd );
        this.channelStart = Math.min( channelStart, channelEnd );
        this.channelEnd = Math.max( channelStart, channelEnd );
        this.byte1Start = Math.min( byte1Start, byte1End );
        this.byte1End = Math.max( byte1Start, byte1End );
        this.byte2Start = Math.min( byte2Start, byte2End );
        this.byte2End = Math.max( byte2Start, byte2End );
        this.behaviour = behaviour;
    };

    DIVISI.Filter = Filter;

    DIVISI.createFilter = function( settings ) {
        return new Filter( settings );
    };
}() );