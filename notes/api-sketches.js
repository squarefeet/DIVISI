// DIVISI.revision = 1;
// DIVISI.supported = BOOLEAN;
// DIVISI.lowestOctave = -2;
// DIVISI.epsilon = 0.001;
// DIVISI.noteRegExp;
// DIVISI.noteStrings = [];
// DIVISI.noteValues = {};
// DIVISI.messagePoolSize = 500;
// DIVISI.tuning = 0; // Cents. 0 is default.

DIVISI.setMessagePoolSize( 1000 ); // Grow or shrink the internal message pool size.

DIVISI.connect();

var inputs = DIVISI.getInputs();
var outputs = DIVISI.getOutputs();


DIVISI.enableInput( inputs[ 0 ] );
DIVISI.disableInput( inputs[ 0 ] );
DIVISI.enableOutput( outputs[ 0 ] );
DIVISI.disableOutput( outputs[ 0 ] );

DIVISI.enableAllInputs();
DIVISI.disableAllInputs();
DIVISI.enableAllOutputs();
DIVISI.disableAllOutputs();

// These probably make the enableInput() etc. functions above pointless.
DIVISI.getInput( index ); // Returns an input. Can be used as a starting point in an effect chain.
DIVISI.getOutput( index ); // Returns an output. Can be used as an end point in an effect chain.

DIVISI.getRawInput( index ); // Returns a raw input, as given by the WebMIDI API.
DIVISI.getRawOutput( index ); // As above, for an output.

DIVISI.pipe( input, output ); // pipes an input to an output. Accepts raw or DIVISI inputs.
DIVISI.pipe( midiEffect, output ); // pipes effect to an output. Accepts raw or DIVISI outputs.
DIVISI.pipe( midiMessage, output ); // sends single message to output. Accepts raw or DIVISI outputs.

DIVISI.on( '', function );
DIVISI.off( '', ? function );
DIVISI.trigger( '', ? arguments, ? scope );


// Will *:connect events work here?
// - Page probably needs refreshing to pick up on
//   new devices.
DIVISI.on( 'input:connect', function( input ) {} );
DIVISI.on( 'input:disconnect', function( input ) {} );

DIVISI.on( 'output:connect', function( output ) {} );
DIVISI.on( 'output:disconnect', function( output ) {} );

// What other events should be included?


DIVISI.Input
    .on( 'message' )
    .on()

DIVISI.Output
    .trigger( 'message', message );


// DIVISI.constants.INCLUDE = 1;
// DIVISI.constants.EXCLUDE = 2;
// DIVISI.constants.PASS_THROUGH = 2;
// DIVISI.constants.CLIP = 4;
// DIVISI.constants.GATE = 5;
// DIVISI.constants.FIXED = 6;
// DIVISI.constants.CYCLE = 7;
// DIVISI.constants.ROUND_ROBIN = 8;
// DIVISI.constants.ADD = DIVISI.constants.UP = 9;
// DIVISI.constants.SUBTRACT = DIVISI.constants.DOWN = 10;
// DIVISI.constants.ADD_SUBTRACT = DIVISI.constants.BI_DIRECTIONAL = 11;
// DIVISI.constants.LSB = 12;
// DIVISI.constants.MSB = 13;

// // http://www.midi.org/techspecs/midimessages.php#2
// DIVISI.commands.NOTE_OFF = 128;
// DIVISI.commands.NOTE_ON = 144;
// DIVISI.commands.POLYPHONIC_AFTERTOUCH = 160;
// DIVISI.commands.CONTROL_CHANGE = DIVISI.commands.MODE_CHANGE = DIVISI.commands.CC = 176;
// DIVISI.commands.PROGRAM_CHANGE = 192;
// DIVISI.commands.CHANNEL_AFTERTOUCH = 208;
// DIVISI.commands.PITCH_BEND = 224;

// DIVISI.cc.BANK_SELECT = 0;
// DIVISI.cc.MOD_WHEEL = 1;
// DIVISI.cc.BREATH_CONTROLLER = 2;
// DIVISI.cc.FOOT_CONTROLLER = 4;
// DIVISI.cc.PORTAMENTO_TIME = 5;
// DIVISI.cc.DATA_ENTRY_MSB = 6;
// DIVISI.cc.CHANNEL_VOLUME = 7;
// DIVISI.cc.BALANCE = 8;
// DIVISI.cc.PAN = 10;
// DIVISI.cc.EXPRESSION_CONTROLLER = 11;
// DIVISI.cc.EFFECT_CONTROL_1 = 12;
// DIVISI.cc.EFFECT_CONTROL_2 = 13;
// DIVISI.cc.GENERAL_CONTROLLER_1 = 16;
// DIVISI.cc.GENERAL_CONTROLLER_2 = 17;
// DIVISI.cc.GENERAL_CONTROLLER_3 = 18;
// DIVISI.cc.GENERAL_CONTROLLER_4 = 19;
// // Include LSB variants of above?
// DIVISI.cc.DAMPER_PEDAL = DIVISI.cc.SUSTAIN = 64;
// DIVISI.cc.PORTAMENTO = 65;
// DIVISI.cc.SOSTENUTO = 66;
// DIVISI.cc.SOFT_PEDAL = 67;
// DIVISI.cc.LEGATO_FOOTSWITCH = DIVISI.cc.LEGATO = 68;
// DIVISI.cc.HOLD_2 = 69;
// DIVISI.cc.SOUND_CONTROLLER_1 = DIVISI.cc.SOUND_VARIATION = 70;
// DIVISI.cc.SOUND_CONTROLLER_2 = DIVISI.cc.TIMBRE = 71;
// DIVISI.cc.SOUND_CONTROLLER_3 = DIVISI.cc.RELEASE_TIME = 72;
// DIVISI.cc.SOUND_CONTROLLER_4 = DIVISI.cc.ATTACK_TIME = 73;
// DIVISI.cc.SOUND_CONTROLLER_5 = DIVISI.cc.BRIGHTNESS = 74;
// DIVISI.cc.SOUND_CONTROLLER_6 = DIVISI.cc.DECAY_TIME = 75;
// DIVISI.cc.SOUND_CONTROLLER_7 = DIVISI.cc.VIBRATO_RATE = 76;
// DIVISI.cc.SOUND_CONTROLLER_8 = DIVISI.cc.VIBRATO_DEPTH = 77;
// DIVISI.cc.SOUND_CONTROLLER_9 = DIVISI.cc.VIBRATO_DELAY = 78;
// DIVISI.cc.SOUND_CONTROLLER_10 = 79;
// DIVISI.cc.GENERAL_CONTROLLER_5 = 80;
// DIVISI.cc.GENERAL_CONTROLLER_6 = 81;
// DIVISI.cc.GENERAL_CONTROLLER_7 = 82;
// DIVISI.cc.GENERAL_CONTROLLER_8 = 83;
// DIVISI.cc.PORTAMENTO_CONTROL = 84;
// DIVISI.cc.HIGH_RES_VELOCITY_PREFIX = 88;
// DIVISI.cc.EFFECTS_1_DEPTH = 91;
// DIVISI.cc.EFFECTS_2_DEPTH = 92;
// DIVISI.cc.EFFECTS_3_DEPTH = 93;
// DIVISI.cc.EFFECTS_4_DEPTH = 94;
// DIVISI.cc.EFFECTS_5_DEPTH = 95;

// DIVISI.cc.DATA_INCREMENT = 96;
// DIVISI.cc.DATA_DECREMENT = 97;

// // Non-registered parameter number, least significant bit.
// DIVISI.cc.NRPN_LSB = 98;

// // As above, but most significant bit.
// DIVISI.cc.NRPN_MSB = 99;

// // Registered param number, least sig. bit.
// DIVISI.cc.RPN_LSB = 100;

// // Registered param number, most sig. bit.
// DIVISI.cc.RPN_MSB = 101;

// DIVISI.cc.ALL_SOUND_OFF = 120;
// DIVISI.cc.RESET_ALL_CONTROLLERS = 121;
// DIVISI.cc.LOCAL_CONTROL = 122;
// DIVISI.cc.ALL_NOTES_OFF = 123;
// DIVISI.cc.OMNI_MODE_OFF = 124;
// DIVISI.cc.OMNI_MODE_ON = 125;
// DIVISI.cc.MONO_MODE_ON = 126;
// DIVISI.cc.POLY_MODE_ON = 127;



DIVISI.filters.ALL;
DIVISI.filters.NOTE;
DIVISI.filters.NOTE_ON;
DIVISI.filters.NOTE_OFF;
DIVISI.filters.CC;
DIVISI.filters.MOD_WHEEL;
DIVISI.filters.PITCH_BEND;

// DIVISI.chords = {};
DIVISI.commas = {};
DIVISI.intervals = {};
// DIVISI.scales = {};


// DIVISI.utils.messageToBinary( message ); // Outputs binary representation of midi message as string.
// DIVISI.utils.toMIDIMessageEvent( message ); // Outputs a 'native' MIDIMessageEvent, given a DIVISI message object.

// DIVISI.math.roundToMultiple( number, multiple );
// DIVISI.math.roundFromEpsilon( number );
// DIVISI.math.clamp( number, min, max );
// DIVISI.math.scaleNumber( number, highIn, highOut, lowIn, lowOut );
// DIVISI.math.scaleNumberExp( number, highIn, highOut, lowIn, lowOut, exponent );
// DIVISI.math.getOctaveIndex( noteValue );
// DIVISI.math.hzTo(); // Fn collection.
// DIVISI.math.midiTo(); // Fn collection.
// DIVISI.math.bpmTo(); // Fn collection.
// DIVISI.math.msTo(); // Fn collection.
// DIVISI.math.noteTo(); // Fn collection.

// Pre: pre-effect transform
// Post: post-effect transform
DIVISI.Effect.on( 'message:pre', 'message:post' ).connect( input || output || Effect ).disconnect( input || output || Effect );
DIVISI.NoteEffect.on().connect().disconnect();
DIVISI.MessageFilter.on().connect().disconnect();

// Functions
// DIVISI.createMessage( {
//     command: COMMAND,
//     channel: 1 - 16,
//     byte1: 0,
//     byte2: 0,
//     receivedTime: 0,
//     timestamp: 0
// } );

// DIVISI.createRawMessage( ... ); // As above, but creates a MIDIMessageEvent.

// DIVISI.createFilter( {
//     commandStart: COMMAND,
//     commandEnd: COMMAND || undefined,
//     channelStart: 0,
//     channelEnd: 0 || undefined,
//     byte1Start: 0,
//     byte1End: 0 || undefined,
//     byte2Start: 0,
//     byte2End: 0 || undefined,
//     behaviour: INCLUDE || EXCLUDE || PASS_THROUGH
// } );

// DIVISI.createMessageFilter( FILTER );

// Transposer values measured in cents?
// DIVISI.createTransposer( map || value, filter );
DIVISI.createTransposerMap( c, c #, d, d #, ... );
DIVISI.createTransposerMap( {
    'c': -100, // cents
    'c#': +2.50, // or semitones?
    'd': 0,
    ...
} );

DIVISI.createScalify( scale, filter );
// DIVISI.createScalify( {
//     scale: ...,
//     mode: INCLUDE || EXCLUDE, // Play transposed notes or silence them.
//     operation: UP || DOWN || NEAREST_NEIGHBOUR,
//     filter: false
// } );

DIVISI.createChordify( map || chord, filter );

// DIVISI.createValueControl( {
//     mode: CLIP || GATE || FIXED
//     inMin: 0,
//     inMax: 127,
//     outMin: 0,
//     outMax: 127,
//     compression: -1 - 1,
//     drive: -1 - 1,
//     targetByte: 0,
//     random: 0
// } );

// DIVISI.createValueRandomiser( {
//     mode: ROUND_ROBIN || RANDOM,
//     chance: 0 - 1,
//     operation: ADD || SUBTRACT || BOTH,
//     range: 0 - 127,
//     multiplier: 1 - 24,
//     targetByte: 0
// } );

// DIVISI.createRoundRobin( nodes... ).add( node ).remove( node ).clear().reset();

DIVISI.createTranslator( map );

DIVISI.createTranslatorMap( [ {
    input: MESSAGE || FILTER,
    output: MESSAGE
} ] ); // Given an array of input and output conditions, translate messages accordingly.

DIVISI.createTranslatorMessage( {
    byte0: ...,
} );