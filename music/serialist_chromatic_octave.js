/* global setTimeout */
/* global document */
/* global Synth */

var serialist_chromatic_octave = {
	start: function(speed) {
		if (!serialist_chromatic_octave.running) {
			serialist_chromatic_octave.stop = false;
			serialist_chromatic_octave.running = true;
			serialist_chromatic_octave.speed = speed;
			serialist_chromatic_octave.pattern();
		}
	},

	instrument: Synth.createInstrument('piano'),

	playNote: function(note) {
		var note_display = document.getElementById('serialist_chromatic_octave-note_display');
		var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

		note_display.innerHTML = note_display.innerHTML + ' ' + notes[note];

		serialist_chromatic_octave.instrument.play(notes[note], 4, serialist_chromatic_octave.speed/1000);
	},

	pattern: function() {
		var note_display = document.getElementById('serialist_chromatic_octave-note_display');
		var remaining_notes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; //chromatic range, C# to B

		function end() {
			serialist_chromatic_octave.playNote(0);
			note_display.innerHTML = '';
			serialist_chromatic_octave.running = false;
		}

		function restart() {
				note_display.innerHTML = '';
				serialist_chromatic_octave.pattern();
		}

		function randomNote() {
			if (remaining_notes[0] !== undefined) {
				var pos = Math.floor(Math.random()*remaining_notes.length);

				var note = remaining_notes[pos];
				serialist_chromatic_octave.playNote(note);

				remaining_notes.splice(pos, 1);
				setTimeout(randomNote, serialist_chromatic_octave.speed);
			} else if (!serialist_chromatic_octave.stop) {
				restart();
			} else {
				end();
			}
		}

		serialist_chromatic_octave.playNote(0); //start with C
		setTimeout(randomNote, serialist_chromatic_octave.speed);
	}
};

//preload hack to prevent skipping
Synth.setVolume(0.0);
serialist_chromatic_octave.instrument.play('C', 4, 1);
Synth.setVolume(1.0);
