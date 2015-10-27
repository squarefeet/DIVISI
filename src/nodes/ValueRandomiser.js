( function() {
    var BYTE2 = DIVISI.constants.BYTE2,
        RANDOM = DIVISI.constants.RANDOM,
        ADD = DIVISI.constants.ADD,
        SUBTRACT = DIVISI.constants.SUBTRACT,
        BI_DIRECTIONAL = DIVISI.constants.BI_DIRECTIONAL,
        ROUND_ROBIN = DIVISI.constants.ROUND_ROBIN,

        random = Math.random,
        round = Math.round,
        clamp = DIVISI.math.clamp;

    function ValueRandomiser( settings ) {
        DIVISI.Node.call( this );

        this.targetByte = typeof settings.targetByte === 'number' ? settings.targetByte : BYTE2;
        this.mode = settings.mode || RANDOM;
        this.chance = typeof settings.chance === 'number' ? settings.chance : 0.5;
        this.operation = typeof settings.operation === 'number' ? settings.operation : ADD;
        this.range = settings.range || 12;
        this.multiplier = settings.multiplier || 1;

        this._roundRobinIndex = 0;
        this._direction = 1;
    };

    ValueRandomiser.prototype = Object.create( DIVISI.Node.prototype );

    ValueRandomiser.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }

        var sourceValue = message.data[ this.targetByte ],
            shouldRandomise = random() <= this.chance,
            outputValue = sourceValue,
            randomValue;

        if ( shouldRandomise ) {
            if ( this.mode === ROUND_ROBIN ) {
                randomValue = this._roundRobinIndex;

                if ( ( ++this._roundRobinIndex ) === this.range * this.multiplier ) {
                    this._roundRobinIndex = 0;
                }
            }
            else {
                randomValue = random() * this.range * this.multiplier;
            }

            switch ( this.operation ) {
                case ADD:
                    outputValue += randomValue;
                    break;

                case SUBTRACT:
                    outputValue -= randomValue;
                    break;

                case BI_DIRECTIONAL:
                    this._direction *= -1;
                    outputValue += randomValue * this._direction;
                    break;
            }



            outputValue = round( outputValue );

            message.data[ this.targetByte ] = clamp( outputValue, 0, 127 );
        }

        this.trigger( 'message:post', message );
    };

    DIVISI.ValueRandomiser = ValueRandomiser;

    DIVISI.createValueRandomiser = function( settings ) {
        return new ValueRandomiser( settings );
    };

}() );