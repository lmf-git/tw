define(
	['scripts/AutoScavenge'],
	function(scavenge) {
		return {
			open: () => {
				alert('Testing');
				scavenge();
			}
		}
	}
);