( function() {

    var DIVISI_UTILS = DIVISI.utils;

    function Translator( map ) {
        DIVISI.Node.call( this );

        this.map = map ? Array.isArray( map ) ? map : [ map ] : [];

        this._workingData = [ 0, 0, 0 ];
    };

    Translator.prototype = Object.create( DIVISI.Node.prototype );

    Translator.prototype._translate = function( message, output ) {
        this._workingData[ 0 ] = message.data[ 0 ];
        this._workingData[ 1 ] = message.data[ 1 ];
        this._workingData[ 2 ] = message.data[ 2 ];

        if ( typeof output.byte0 === 'number' ) {
            message.data[ 0 ] = output.byte0;
        }
        else if ( typeof output.byte0 === 'string' && +output.byte0 < 3 ) {
            message.data[ 0 ] = this._workingData[ +output.byte0 ];
        }

        if ( typeof output.byte1 === 'number' ) {
            message.data[ 1 ] = output.byte1;
        }
        else if ( typeof output.byte1 === 'string' && +output.byte1 < 3 ) {
            message.data[ 1 ] = this._workingData[ +output.byte1 ];
        }

        if ( typeof output.byte2 === 'number' ) {
            message.data[ 2 ] = output.byte2;
        }
        else if ( typeof output.byte2 === 'string' && +output.byte2 < 3 ) {
            message.data[ 2 ] = this._workingData[ +output.byte2 ];
        }
    };

    Translator.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );

        if ( message.ignore === true ) {
            this.trigger( 'message:post', message );
            return;
        }

        for ( var i = 0, condition; i < this.map.length; ++i ) {
            condition = this.map[ i ];

            if ( condition.input instanceof DIVISI.Filter ) {
                if ( DIVISI_UTILS.matchFilter( condition.input, message ) ) {
                    this._translate( message, condition.output );
                }
            }
        }

        this.trigger( 'message:post', message );
    };

    DIVISI.Translator = Translator;

    DIVISI.createTranslator = function( map ) {
        return new Translator( map );
    };


    DIVISI.createTranslatorMessage = function( settings ) {
        var byte0 = ( settings && ( typeof settings.byte0 === 'number' || typeof settings.byte1 === 'string' ) ) ? settings.byte0 :
            ( settings && ( typeof settings.command === 'number' || typeof settings.byte1 === 'string' ) ) ? settings.command :
            false;

        return {
            byte0: byte0,
            byte1: ( settings && ( typeof settings.byte1 === 'number' || typeof settings.byte1 === 'string' ) ) ? settings.byte1 : false,
            byte2: ( settings && ( typeof settings.byte2 === 'number' || typeof settings.byte2 === 'string' ) ) ? settings.byte2 : false,
        };
    };
}() );