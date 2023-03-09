{
	
	
	init: function(elevators, floors) {
	  
		var context = {
			es: [{e: null, id: 0, dir: 1}],
			fs: [{f: null, id: 0, pressed_up: 0, pressed_down: 0}]
		};

	   for (let iFloor = 0; iFloor < floors.length; ++iFloor)
	   {
		   context.fs[iFloor] = {f:floors[iFloor], id: iFloor, pressed_up: 0, pressed_down: 0};
		   let floor = context.fs[iFloor];
		   
		   floor.f.on("up_button_pressed", function() {
			   floor.pressed_up = 1;
		   })
		   
		   floor.f.on("down_button_pressed", function() {
			   floor.pressed_down = 1;
		   })
	   }
		
		for (let iElevator = 0; iElevator < elevators.length; ++iElevator)
		{
			context.es[iElevator] = {e:elevators[iElevator], dir:1};
			let elevator = context.es[iElevator];
			
			elevator.e.on("idle", function() 
			{
				//elevator.e.goToFloor(0);
				for (let iFloor = 0; iFloor < floors.length; ++iFloor)
				 { 
					if (context.fs[iFloor].pressed_up === 1)
						{
							this.goToFloor(iFloor);
							break;
						}
					 if (context.fs[iFloor].pressed_down === 1)
					 {
						 this.goToFloor(iFloor);
						 break;
					 }
						
				 }
		   });
			
			elevator.e.on("passing_floor", function(floorNum, direction) { 
				let shouldStopWeight = 0;
				
				if (elevator.e.getPressedFloors().indexOf(floorNum) >= 0)
					shouldStopWeight++;
				
				if (context.fs[floorNum].pressed_up >= 1 && direction === 1)
					shouldStopWeight++;
				
				if (context.fs[floorNum].pressed_down >= 1 && direction === -1)
					shouldStopWeight++;
				
				if (shouldStopWeight > 0)// && elevator.e.loadFactor <= 0.5)
					elevator.e.goToFloor(floorNum, true);
			});
			
			elevator.e.on("stopped_at_floor", function(floorNum) {
				
			})

			elevator.e.on("floor_button_pressed", function(floorNum) {
				elevator.e.goToFloor(floorNum);
			});
			
			elevator.e.on("stopped_at_floor", function(floorNum) 
			{                
		   

			});
			
		}
   
	},
	update: function(dt, elevators, floors) {
		// We normally don't need to do anything here
	}
}