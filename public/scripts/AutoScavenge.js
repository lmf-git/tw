// TODO: Threshold input for not sending  < IMPORTANT
define(
	['axios'],
	function(a) {

        const send = async (optionID, spearNum) => {
            const params = new URLSearchParams({
                village: game_data.village.id,
                screen: 'scavenge_api',
                ajaxaction: 'send_squads'
            });
            
            const data = new FormData();
            data.append('h', game_data.csrf);
            data.append('squad_requests[0][use_premium]', false);
            data.append('squad_requests[0][option_id]', optionID);

            data.append('squad_requests[0][village_id]', game_data.village.id);

            Object.keys(ScavengeScreen.sendable_units).map(unitKey => {
                // const unit = ScavengeScreen.sendable_units[unitKey];
                const amount = unitKey === 'spear' ? spearNum : 0;
                data.append(`squad_requests[0][candidate_squad][unit_counts][${unitKey}]`, amount);
            });

            const carry = ScavengeScreen.sendable_units.spear.carry * spearNum;
            data.append('squad_requests[0][candidate_squad][carry_max]', carry);

            console.log(data);

            const resp = await a.post(`${window.location.origin}/game.php?` + params, data);
            console.log(resp);
        }

		return function() {
            // Gatekeep - Redirect to scavenge screen if necessary.
            if (game_data.screen !== 'place' || game_data.mode !== 'scavenge') {
                alert('Redirecting to necessary screen.');
                window.location.href = `/game.php?screen=place&mode=scavenge`;
            }

            // Attempt to run every 15 minutes.
            setInterval(() => {
                const numSpear= ScavengeScreen.village.unit_counts_home.spear;
                let sent = 0;
    
                // Send the scavenging tasks in best task order first (reversed).
                const options = ScavengeScreen.village.options;
                Object.keys(options).reverse()
                    .filter(o => {
                        const option = options[o];
    
                        console.log(option.is_locked);
                        console.log(option.scavenging_squad);
                        console.log(option.is_pending);
    
                        return true;
                    })
                    .map((o, oI) => {
                        setTimeout(() => {
                            // Find out total spear in village
                            const spear = numSpear - sent;
                            const desired = Math.floor(Math.min(spear / o, spear));
                            
                            console.log(o);
                            console.log(desired);
    
                            // Request 
                            send(o, spear);
    
                            // Let other iterations account for the changes.
                            sent += desired;
                        }, 2000 * oI);
                    });
            }, 60 * 1000 * 15);
		}
	}
);

const scavenge = () => {

};

scavenge();