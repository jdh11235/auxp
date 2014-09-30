var serialist_chromatic_octave = {
	start: function(speed) {
		this.pattern(speed);
	},

	playNote: function(note) {
		console.log(note);
		//TODO: interface with audiosynth.js
	},

	pattern: function(speed) {
		var remaining_notes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

		function randomNote() {
			if (remaining_notes[0] !== undefined) {
				var pos = Math.floor(Math.random()*remaining_notes.length);

				var note = remaining_notes[pos];
				serialist_chromatic_octave.playNote(note);

				remaining_notes.splice(pos, 1);
				setTimeout(randomNote, speed);
			} else if (serialist_chromatic_octave.stop) {
				serialist_chromatic_octave.stop = false;
			} else {
				setTimeout(serialist_chromatic_octave.pattern, speed); //bug
			}
		}

		serialist_chromatic_octave.playNote(0);
		randomNote();
	}
};
