( function() {
    function Node() {
        DIVISI.Events.call( this );

        this.connectionTarget = this;
        this.onmidimessage = this.onmidimessage.bind( this );
    };

    Node.prototype = Object.create( DIVISI.Events.prototype );



    Node.prototype.onmidimessage = function( message ) {
        this.trigger( 'message:pre', message );
        this.trigger( 'message:post', message );
    };

    Node.prototype.connect = function( node ) {
        this.on( 'message:post', node.connectionTarget.onmidimessage );
        return this;
    };

    Node.prototype.disconnect = function( node ) {
        if ( node instanceof Node ) {
            this.off( 'message:post', node.connectionTarget.onmidimessage );
        }
        else if ( node === undefined ) {
            this.off( 'message:post' );
        }

        return this;
    };

    Node.prototype.fan = function() {
        var nodes = Array.prototype.slice.call( arguments );

        for ( var i = 0, il = nodes.length; i < il; ++i ) {
            this.connect( nodes[ i ] );
        }

        return this;
    };

    Node.prototype.chain = function() {
        var nodes = Array.prototype.slice.call( arguments ),
            currentNode = this;

        for ( var i = 0, il = nodes.length; i < il; ++i ) {
            currentNode.connect.call( currentNode, nodes[ i ] );
            currentNode = nodes[ i ];
        }

        return this;
    };

    DIVISI.Node = Node;

    DIVISI.createNode = function() {
        return new Node();
    };
}() );