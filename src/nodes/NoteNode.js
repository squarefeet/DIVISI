( function() {
    var filter = undefined;

    function NoteNode() {
        DIVISI.Node.call( this );

        if ( !filter ) {
            filter = DIVISI.createFilter( {
                commandStart: DIVISI.commands.NOTE_ON,
                commandEnd: DIVISI.commands.NOTE_OFF,
                channelStart: 0
            } );
        }

        this.filter = new DIVISI.MessageFilter( filter );

        this.filter.connect( this );
        this.connectionTarget = this.filter;
    };

    NoteNode.prototype = Object.create( DIVISI.Node.prototype );;

    DIVISI.NoteNode = NoteNode;

    DIVISI.createNoteNode = function() {
        return new NoteNode();
    };
}() );