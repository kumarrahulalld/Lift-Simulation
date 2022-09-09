function moveUp(destinationFloor) {
   console.log(destinationFloor)
   var availableLift=findAvailableLift(destinationFloor)
   //console.log(availableLift)
   if(availableLift==32767)
   {
      alert("No lift currently available");
   }
   else if(availableLift==-1)
   return
   else{
      var element=document.getElementById("lift-"+availableLift)
    var currentFloor=element.getAttribute("currentfloor")
    if(currentFloor==destinationFloor)
    return
    element.setAttribute("destinationfloor",destinationFloor)
    element.setAttribute("isbusy",true)
    var distance=(200*Math.abs(destinationFloor-currentFloor))+Math.abs(destinationFloor-currentFloor)
    var duration=10000
    var isNegated = destinationFloor > currentFloor;
    if (isNegated) { distance *= -1; }
    var elStyle = window.getComputedStyle(element);
    var value = elStyle.getPropertyValue("top").replace("px", "");
    var destination = Number(value) + distance;
    var frameDistance = distance / (duration / 10);
    function moveAFrame() {
       elStyle = window.getComputedStyle(element);
       value = elStyle.getPropertyValue("top").replace("px", "");
       var newLocation = Number(value) + frameDistance;
       var beyondDestination = ( (!isNegated && newLocation>=destination) || (isNegated && newLocation<=destination) );
       if (beyondDestination) {
          element.style["top"] = destination + "px";
          element.setAttribute("currentfloor",destinationFloor)
          element.setAttribute("isbusy",false)
          clearInterval(movingFrames);
       }
       else {
          element.style["top"] = newLocation + "px";
       }
    }
    var movingFrames = setInterval(moveAFrame, 10);
 }
}
function  findAvailableLift(destinationFloor)
 {
   var availableLift=32767;
   var nearestLift=32767;
  [...document.getElementsByClassName("lift")].forEach(element => {  
   if(element.getAttribute("destinationfloor")==destinationFloor)
   availableLift=-1;

   if(element.getAttribute("isbusy")=="false" && availableLift!=-1)
      {
         console.log(element.id)
         if(nearestLift > Math.abs(element.getAttribute("currentfloor")-destinationFloor)){
            nearestLift=Math.abs(element.getAttribute("currentfloor")-destinationFloor)
         availableLift=element.getAttribute("id").split("-")[1]
         }
      }

  });
  
  return availableLift;
 }

 function createLiftLayout()
 {
   var numberOfFloors=document.getElementById("floor-number").value
   var numberOfLifts=document.getElementById("lift-number").value
   var rootNode=document.getElementById("container")
   if(numberOfFloors>0 && numberOfLifts>0)
   {  
      rootNode.innerHTML=''
      for(let index=numberOfFloors;index>=1;index--){     
      var floorElement=document.createElement('div')
      var floorControls=document.createElement('div')
      var upControl=document.createElement('button')
      upControl.textContent='U'
      upControl.onclick=function (){moveUp(index);}
      var downControl=document.createElement('button')
      downControl.textContent='D'
      downControl.onclick=function (){moveUp(index);}
      floorControls.id='controls'
      floorControls.className="row controller"
      if(index!=numberOfFloors)
      floorControls.appendChild(upControl)
      if(index!=1)
      floorControls.appendChild(downControl)
      floorElement.id='floor-'+index
      floorElement.className="row floor"
      floorElement.appendChild(floorControls)
      rootNode.appendChild(floorElement)
      if(index==1){
      var liftHolder=document.createElement('div')
      liftHolder.id="lift-holder"
      liftHolder.className="row"
      for(liftIndex=1;liftIndex<=numberOfLifts;liftIndex++)
      {
         var tempLift=document.createElement('div')
         var leftDoor=document.createElement('div')
         var rightDoor=document.createElement('div')
         leftDoor.className='left-door'
         rightDoor.className='right-door'
         tempLift.id='lift-'+liftIndex
         tempLift.className='column lift';
         tempLift.setAttribute('currentfloor',1)
         tempLift.setAttribute('destinationfloor',0)
         tempLift.setAttribute('isbusy',false)
         tempLift.appendChild(leftDoor)
         tempLift.appendChild(rightDoor)
         liftHolder.appendChild(tempLift)
      }
      floorElement.appendChild(liftHolder)
      }
      
   }
   }
   else
   {
      if(numberOfFloors<1)
      alert("Please provide valid number of floors > 0 ")
      else
      alert("Please provide valid number of lifts > 0 ")
   }
 }
