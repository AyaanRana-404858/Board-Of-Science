

const scriptsInEvents = {

	async Boardevents_Event41_Act2(runtime, localVars)
	{
		const turn = runtime.globalVars.Turn;
		const isCorrect = runtime.globalVars.TempCorrect; 
		
		// Scoring
		if (turn === 1) { isCorrect === 1 ? runtime.globalVars.P1Score += 2 : runtime.globalVars.P1Score -= 2; }
		else if (turn === 2) { isCorrect === 1 ? runtime.globalVars.P2Score += 2 : runtime.globalVars.P2Score -= 2; }
		else if (turn === 3) { isCorrect === 1 ? runtime.globalVars.P3Score += 2 : runtime.globalVars.P3Score -= 2; }
		else if (turn === 4) { isCorrect === 1 ? runtime.globalVars.P4Score += 2 : runtime.globalVars.P4Score -= 2; }
		
		// Close Layers
		const qL = runtime.layout.getLayer("Quiz");
		const bL = runtime.layout.getLayer("Board");
		if (qL) { qL.isVisible = false; qL.isInteractive = false; }
		if (bL) { bL.isInteractive = true; }
		
		// Advance Turn and set Cooldown
		runtime.globalVars.Turn += 1;
		runtime.globalVars.MovesLeft = -1;
	},

	async Boardevents_Event42_Act2(runtime, localVars)
	{
		const turn = runtime.globalVars.Turn;
		const isCorrect = runtime.globalVars.TempCorrect; 
		
		// Scoring
		if (turn === 1) { isCorrect === 1 ? runtime.globalVars.P1Score += 2 : runtime.globalVars.P1Score -= 2; }
		else if (turn === 2) { isCorrect === 1 ? runtime.globalVars.P2Score += 2 : runtime.globalVars.P2Score -= 2; }
		else if (turn === 3) { isCorrect === 1 ? runtime.globalVars.P3Score += 2 : runtime.globalVars.P3Score -= 2; }
		else if (turn === 4) { isCorrect === 1 ? runtime.globalVars.P4Score += 2 : runtime.globalVars.P4Score -= 2; }
		
		// Close Layers
		const qL = runtime.layout.getLayer("Quiz");
		const bL = runtime.layout.getLayer("Board");
		if (qL) { qL.isVisible = false; qL.isInteractive = false; }
		if (bL) { bL.isInteractive = true; }
		
		// Advance Turn and set Cooldown
		runtime.globalVars.Turn += 1;
		runtime.globalVars.MovesLeft = -1;
	},

	async Boardevents_Event43_Act1(runtime, localVars)
	{
		// 1. AUTO-ZOOM LOGIC
		// We compare the current window size to your original design (1920x1080)
		const scaleX = runtime.viewportWidth / 1920;
		const scaleY = runtime.viewportHeight / 1080;
		const finalScale = Math.min(scaleX, scaleY);
		
		// Apply the zoom to the whole layout
		runtime.layout.scale = finalScale;
		
		// 2. UI REPOSITIONING
		// List all UI objects from your project tree that need to stay at the bottom
		const uiGroups = [
		    runtime.objects.Answer1,
			runtime.objects.Answer1Txt,
			runtime.objects.Answer2,
			runtime.objects.Answer2Txt,
			runtime.objects.BG,
			runtime.objects.Board,
			runtime.objects.Dice,
			runtime.objects.DiceTxt,
			runtime.objects.Player,
			runtime.objects.Player2,
			runtime.objects.Player3,
			runtime.objects.Player4,
			runtime.objects.Player5,
			runtime.objects.Player6,
			runtime.objects.Player7,
			runtime.objects.Player8,
			runtime.objects.Question,
			runtime.objects.ScoreBG,
			runtime.objects.Start,
			runtime.objects.Tile,
			runtime.objects.TurnBG,
			runtime.objects.Score1,
			runtime.objects.Score2,
			runtime.objects.Score3,
			runtime.objects.Score4,
			runtime.objects.TurnsNum,
			runtime.objects.TurnsTxt
		];
		
		uiGroups.forEach(objType => {
		    for (const inst of objType.getAllInstances()) {
		        // This keeps them centered horizontally
		        inst.x = runtime.viewportWidth / 2 + (inst.x - 960) * finalScale;
		        
		        // This keeps them relative to the bottom of the actual screen
		        // We calculate their original distance from the bottom (1080)
		        const originalDistFromBottom = 1080 - inst.y;
		        inst.y = runtime.viewportHeight - (originalDistFromBottom * finalScale);
		        
		        // Match the scale of the object to the layout zoom
		        inst.width = inst.objectType.plugin.isText ? inst.width : inst.objectType.width * finalScale;
		        inst.height = inst.objectType.plugin.isText ? inst.height : inst.objectType.height * finalScale;
		    }
		});
	},

	async Endingevents_Event1_Act1(runtime, localVars)
	{
		// 1. Grab current scores from Construct 3's global variables
		const scores = {
		    "P1": runtime.globalVars.P1Score,
		    "P2": runtime.globalVars.P2Score,
		    "P3": runtime.globalVars.P3Score,
		    "P4": runtime.globalVars.P4Score
		};
		
		// 2. Find the player name with the highest score
		const winner = Object.keys(scores).reduce((a, b) => scores[a] >= scores[b] ? a : b);
		
		// 3. Output the winning name directly to your global variable
		runtime.globalVars.WinnerScoreNUM = winner;
		
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
