var serialist_chromatic_octave = {
	start: function(speed) {
		this.stop = false;
		this.speed = speed;
		this.pattern();
	},

	playNote: function(note) {
		var note_display = document.getElementById('serialist_chromatic_octave-note_display');
		note_display.innerHTML = note_display.innerHTML + ' ' + note;
		//TODO: convert display from note number to note names
		//TODO: interface with audiosynth.js
	},

	pattern: function() {
		var note_display = document.getElementById('serialist_chromatic_octave-note_display');
		var remaining_notes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //c# to b, chromatic scale

		function randomNote() {
			if (remaining_notes[0] !== undefined) {
				var pos = Math.floor(Math.random()*remaining_notes.length);

				var note = remaining_notes[pos];
				serialist_chromatic_octave.playNote(note);

				remaining_notes.splice(pos, 1);
				setTimeout(randomNote, serialist_chromatic_octave.speed);
			} else if (!serialist_chromatic_octave.stop) {
				note_display.innerHTML = '';
				serialist_chromatic_octave.pattern();
			} else {
				note_display.innerHTML = '';
			}
		}

		serialist_chromatic_octave.playNote(0); //starting c
		setTimeout(randomNote, serialist_chromatic_octave.speed);
	}
};
