// Needs ability to choose device.


// All MIDI events should have the same structure, otherwise it'll
// be a nightmare.
//
// Should I juse use the default web-midi TypedArray data?
// - Pros:
// 		- Adheres to spec.
// 		- Allows usage of lib without relying on proprietary
// 		  event structure.
// 		- Easier to adopt if you already know WebMIDI event data.
// 		- Will allow for things like Chordify/NoteRoundRobin to
// 		  just emit spec-adhering events.
//
// - Cons:
// 		- Must have helpers to translate into command/channel/type/param1/param2,
// 		  i.e. it's not done automatically.
//
//
// All MIDI effects should have a map of accepted events that it will respond to.
//
// Flow:
// - WebMIDI access
// 	- Event triggered
// 	  - Event passed to whatever is listening
// - If !WebMIDI...?? Fail gracefully.
//
//
// MIDIMessageFilter
// -----------------
// - Listens to all incoming events
// - Only passes on those events that it's told to.
//
// Chordify
// ---------
// - Receive single MIDI note-on message
// - Create n MIDI note-on messages, according to the chord specified.
// - Allow for other MIDI events to change the chord.
// 		- Map MIDI note to particular chord
// 		- Map MIDI CC to chord change (sweep thru array of chords)
// - Receive single MIDI note-off message, send n MIDI note-off messages
//   according to the chord connected to that note.
//
//
// Transposer
// ----------
// - Receive MIDI message
// - Transpose according to settings (single value or map)
//
//
// Randomizer
// --------
// - Receive MIDI messages
// - Emulate Live's `Random` MIDI effect
// - Emits altered MIDI message.
//
//
// VelocityControl
// --------
// - Emulate Live's Velocity MIDI effect.
//
//
// RoundRobin
// ----------
// - Takes a bunch of MIDIEffects and cycles through them one by one,
//   incrementing the active effect index each time a message is passed.
//
// Scalify
// -------
// - Receive single MIDI note-on message
// - Translate to scale (nearest neighbour / force-up / force-down)
// - Create new MIDI note-on message and emit
// 		- Or, alter incoming note-on message and pass-on?
// - Pass custom translation maps (think Live's `Scale` module).
//
//
// Event Translator
// ----------------
// - Listen for one or more specific events
// - When events are triggered, translate to another message
// - Eg. will allow for C1 note-on event to be translated into a
//   another message type.
// - Eg. C1-C2 could be mapped to mod-wheel event values (0-127 in multiples of 12).
//
//
// Chord Builder
// -------------
// - Merge chords together (each chord being merged can be given an offset, or root note)
// - Create chords by playing notes (ability to map MIDI message to rec start/stop)
// - Create chords by adding intervals one by one.
//
// General MIDI note message settings
// ----------------------------------
// - Ability to change temperament
// - Ability to change global tuning
// - Ability to change the value of a semitone (microtonal),
// 	 or the value of a particular note's interval, or noteInOctave's interval.