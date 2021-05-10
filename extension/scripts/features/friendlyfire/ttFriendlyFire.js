"use strict";

(async () => {
	featureManager.registerFeature(
		"Friendly Fire",
		"profile",
		() => settings.pages.profile.showAllyWarning,
		null,
		addWarning,
		removeWarning,
		{
			storage: ["settings.pages.profile.showAllyWarning", "settings.allyFactionsIDs"],
		},
		null
	);

	async function addWarning() {
		if (document.find(".tt-ally-warning")) document.find(".tt-ally-warning").remove();
		await requireElement(".user-info-value [href*='/factions.php']");
		let warning;
		const factionID = parseInt(document.find(".user-info-value [href*='/factions.php']").href.replace(/\D+/g, ""));
		const factionName = document.find(".user-info-value [href*='/factions.php']").innerText.trim();
		if (factionID === userdata.faction.faction_id) warning = "This user is in your faction!";
		else if (settings.allyFactionsIDs.some((x) => {
			if (isIntNumber(x)) return x === factionID;
			else return x.trim() === factionName;
		})) warning = "This user is an ally!";
		document.find(".profile-left-wrapper .title-black").appendChild(
			document.newElement({
				type: "span",
				class: "tt-ally-warning",
				text: warning,
			})
		);
	}

	function removeWarning() {
		document.findAll(".tt-ally-warning").forEach((x) => x.remove());
	}
})();
