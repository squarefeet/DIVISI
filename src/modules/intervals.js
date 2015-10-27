( function( scope ) {
    var intervalNames = [
        // 0
        [
            'unison',
            'perfectUnison',
            'p1',
            'diminishedSecond',
            'd2'
        ],

        // 1
        [
            'minorSecond',
            'm2',
            'augmentedUnison',
            'A1',
            'semitone',
            'halfTone',
            'halfStep',
            'S',
            'H'
        ],

        // 2
        [
            'majorSecond',
            'M2',
            'diminishedThird',
            'd3',
            'tone',
            'wholeTone',
            'wholeStep',
            'T',
            'W'
        ],


        // 3
        [
            'minorThird',
            'm3',
            'augmentedSecond',
            'A2'
        ],

        // 4
        [
            'majorThird',
            'M3',
            'diminishedFourth',
            'd4'
        ],

        // 5
        [
            'perfectFourth',
            'P4',
            'augmentedThird',
            'A3'
        ],

        // 6
        [
            'diminishedFifth',
            'augmentedFourth',
            'd5',
            'A4',
            'tritone',
            'TT'
        ],

        // 7
        [
            'perfectFifth',
            'P5',
            'diminishedSixth',
            'd6'
        ],

        // 8
        [
            'minorSixth',
            'm6',
            'augmentedFifth',
            'A5'
        ],

        // 9
        [
            'majorSixth',
            'M6',
            'diminishedSeventh',
            'd7'
        ],

        // 10
        [
            'minorSeventh',
            'm7',
            'augmentedSixth',
            'A6'
        ],

        // 11
        [
            'majorSeventh',
            'M7',
            'diminishedOctave',
            'd8'
        ],

        // 12
        [
            'octave',
            'perfectOctave',
            'P8',
            'augmentedSeventh',
            'A7',
            'diminishedNinth',
            'd9'
        ],

        // 13
        [
            'minorNinth',
            'm9',
            'augmentedOctave',
            'A8'
        ],

        // 14
        [
            'majorNinth',
            'm9',
            'diminishedTenth',
            'd10'
        ],

        // 15
        [
            'minorTenth',
            'm10',
            'augmentedNinth',
            'A9'
        ],

        // 16
        [
            'majorTenth',
            'M10',
            'diminishedEleventh',
            'd11'
        ],

        // 17
        [
            'perfectEleventh',
            'P11',
            'augmentedTenth',
            'A10'
        ],

        // 18
        [
            'diminishedTwelfth',
            'd12',
            'augmentedEleventh',
            'A11'
        ],

        // 19
        [
            'perfectTwelfth',
            'tritave',
            'P12',
            'diminishedThirteenth',
            'd13'
        ],

        // 20
        [
            'minorThirteenth',
            'm13',
            'augmentedTwelfth',
            'A12'
        ],

        // 21
        [
            'majorThirteenth',
            'M13',
            'diminishedFourteenth',
            'd14'
        ],

        // 22
        [
            'minorFourteenth',
            'm14',
            'augmentedThirteenth',
            'A13'
        ],

        // 23
        [
            'majorFourteenth',
            'M14',
            'diminishedFifteenth',
            'd15'
        ],

        // 24
        [
            'perfectFifteenth',
            'doubleOctave',
            'P15',
            'augmentedFourteenth',
            'A14'
        ],

        // 25
        [
            'augmentedFifteenth',
            'A15'
        ]
    ];

    var intervals = {};

    for ( var i = 0; i < intervalNames.length; ++i ) {
        for ( var j = 0; j < intervalNames[ i ].length; ++j ) {
            intervals[ intervalNames[ i ][ j ] ] = i;
        }
    }

    scope.intervals = intervals;
}( DIVISI ) );