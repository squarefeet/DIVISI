DIVISI
======

**Divisi** (di-VEE-zee)<br/> <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>**1.**  _verb_ To divide a single section of instruments into multiple subsections of instruments.<br/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span>**2.** _proper noun_ A WebMIDI helper library.




**Note:** This library is a work-in-progress and _far_ from being usable!



Example
-------

```javascript
// Create a filter to mark note events as the only ones
// that should be altered
var filter = DIVISI.createFilter( {
	command: DIVISI.commands.NOTE_ON,
	commandEnd: DIVISI.commands.NOTE_OFF
} );

// Create a velocity control node that cuts off
// any notes with a velocity less than 64.
var velocityControl = DIVISI.createValueControl( {
	inMin: 64,
	mode: DIVISI.constants.GATE,
	targetByte: DIVISI.constants.BYTE2 // target the 3rd byte in the message (index 2), in this case the note's velocity.
} );

// Create a chord-player. Any MIDI note messages passed into it
// will play a harmonic seventh chord, first-inversion.
var chordify = DIVISI.createChordify( {
	chord: DIVISI.chords.HarmonicSeventh,
	inversion: 0
} );

// Connect the filter to the velocity control and
// the velocity control to the chordify instance.
filter.chain( velocityControl, chordify );

// For now, just log out the resulting message.
chordify.on( 'message:post', function( message ) {
	console.log( message.data );

	// Release this message back into the message pool
	// so it can be re-used.
	DIVISI.releaseMessage( message );
} );

// For now, let's send a fake MIDI event to kick things off:
filter.onmidimessage( DIVISI.createMessage( {
	// Send a note-on message
	command: DIVISI.commands.NOTE_ON,

	// The note we're playing is 'C3'...
	byte1: DIVISI.math.noteToMIDI( 'C3' ),

	// ...and has a velocity value of 127.
	byte2: 127
} ) );

```


About
-----

DIVISI is a WebMIDI helper library to transform incoming MIDI messages. Rather than dividing instruments, it allows you to divide MIDI messages up depending on their type of value.

It can do stuff like:

* Create chords from a single note.
* Make sure all notes played adhere to a given scale.
* Filter MIDI messages.
* Randomise MIDI message bytes.
* Transpose an incoming note.
* Perform a round-robin on a group of effects/transformers/nodes.
* Translate an incoming message into a different message (think of letting the 'C#1' note control pitch-bend, for example).
* Support microtones.
* Convert hz, midi, note strings (including accidentals, and cents), milliseconds, and bpm values to and from each other.


It will eventually do stuff like:

* Support Node.js so it can be used as one part of a virtual MIDI stack (full I/O).
* Listen to WebMIDI input and pass incoming messages into DIVISI chains.
* Support global tuning.
* Maybe support different tuning temperaments.


The API is based on the WebAudio API, allowing nodes to be created and connected together (with a few handy functions to enable quick chaining and fanning of nodes).

DIVISI has a list of chords, scales, commas, and intervals built-in.



Aims
----

* Performance. Must introduce as little latency as possible.
* Simple. Creating complex chains must be easy to do.
* Support WebMIDI input in browser environment, and also MIDI input in Node.js.