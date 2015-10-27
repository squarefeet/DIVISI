( function() {
    var MATH = Math,
        DIVISI_MATH = DIVISI.math,
        DIVISI_UTILS = DIVISI.utils,

        pow = MATH.pow,
        abs = MATH.abs,
        sign = MATH.sign,
        min = MATH.min,
        max = MATH.max,
        random = MATH.random,

        FIXED = DIVISI.constants.FIXED,
        GATE = DIVISI.constants.GATE,
        CLIP = DIVISI.constants.CLIP;

    function ValueControl( settings ) {
        DIVISI.Node.call( this );

        settings = settings || {};

        this.mode = typeof settings.mode === 'number' ? settings.mode : DIVISI.constants.CLIP;
        this.inMin = typeof settings.inMin === 'number' ? settings.inMin : 0;
        this.inMax = typeof settings.inMax === 'number' ? settings.inMax : 127;
        this.outMin = typeof settings.outMin === 'number' ? settings.outMin : 0;
        this.outMax = typeof settings.outMax === 'number' ? settings.outMax : 127;
        this.compand = typeof settings.compand === 'number' ? settings.compand : 0;
        this.drive = typeof settings.drive === 'number' ? settings.drive : 0;
        this.random = typeof settings.random === 'number' ? settings.random : 0;
        this.targetByte = typeof settings.targetByte === 'number' ? settings.targetByte : DIVISI.constants.BYTE2;
    };

    ValueControl.prototype = Object.create( DIVISI.Node.prototype );

    ValueControl.prototype.applyCompand = function( value ) {
        var out = value,
            compand = this.compand;

        if ( compand > 0 ) {
            out = pow( abs( value ), 1 / ( this.compand + 1 ) ) * sign( value );
        }

        else if ( compand < 0 ) {
            out = value * pow( abs( value ), abs( this.compand ) );
        }

        return out;
    };

    ValueControl.prototype.applyDrive = function( value ) {
        var out = value,
            drive = this.drive;

        if ( drive > 0 ) {
            out = 2 * pow( abs( value * -0.5 + 0.5 ), 1 + drive ) * -1 + 1;
        }
        else if ( drive < 0 ) {
            out = 2 * pow( value * 0.5 + 0.5, abs( drive - 1 ) ) - 1;
        }

        return out;
    };

    ValueControl.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }

        var value = message.data[ this.targetByte ],
            outputValue = value;


        if ( this.mode === FIXED ) {
            message.data[ this.targetByte ] = this.outMax;
            this.trigger( 'message:post', message );
            return;
        }
        else if ( this.mode === GATE && ( outputValue < this.inMin || outputValue > this.inMax ) ) {
            return;
        }
        else if ( this.mode === CLIP ) {
            outputValue = DIVISI_MATH.clamp( outputValue, min( this.inMin, this.inMax ), max( this.inMin, this.inMax ) );
        }

        outputValue = DIVISI_MATH.scaleNumber( outputValue, 0, 127, -1, 1 );
        outputValue = this.applyDrive( outputValue );
        outputValue = this.applyCompand( outputValue );
        outputValue = DIVISI_MATH.scaleNumber( outputValue, -1, 1, this.outMin, this.outMax );

        if ( this.random !== 0 ) {
            outputValue += -this.random * 0.5 + random() * this.random;
        }

        outputValue = DIVISI_MATH.clamp( outputValue, 0, 127 );

        message.data[ this.targetByte ] = outputValue;

        this.trigger( 'message:post', message, value );
    };

    DIVISI.ValueControl = ValueControl;

    DIVISI.createValueControl = function( settings ) {
        return new DIVISI.ValueControl( settings );
    };

}() );