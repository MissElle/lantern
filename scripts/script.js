//==================SCRIPT FOR LANTERN V2.0=======================//
// global variables, keeps a count for behaviors and master ABD

var count = 1000;
var BASE_URL = 'http://lantern-lizzypresland291247.codeanyapp.com/scripts/getValues.py';

var ABD = ['Slurred speech','Poor academic performance','Signs of hangover (bloodshot eyes, changes in pupils)','Changes in eating habits','Tremors or impaired coordination','High risk behaviors','Poor school attendance','Appears fearful, anxious, or paranoid','Sudden mood swings','Aggressive behavior','Unexplained hyperactivity','Lack of motivation','Excessive moodiness and tears','Anger and irritability','Excessive sensitivity to criticism','Difficulty concentrating','Changes in sleep patterns','Thoughts of suicide','Self-mutilation (cutting)','Feelings of worthlessness and/or helplessness','Changes in eating patterns that result in dramatic weight gain or loss','Body image issues','Unexplained aches and pains','Social isolation, abandonment of peer group','Secrecy','Isolation from family members','Excessive sleeping beyond your child’s normal fatigue or insomnia','Sudden changes in academic performance','Dramatic changes in eating habits','Loss of interest in normal activities','Social isolation','Changes in personality (becomes more aggressive, angry, withdrawn, etc.)','Make changes in their daily rituals?','Retreat from school or activities?','Experience isolation from friends?','Show a dramatic in weight, appearance and/or grades?','Wear clothing inappropriate for the weather (possibly to hide marks)?','Have visible marks or bruises?','Spend excessive amounts of time with the person they’re dating?','Spend excessive amounts of time in contact with the person they are dating through cell phones and computers?','Excessive sleeping, beyond usual teenage fatigue, which could indicate depression or substance abuse; difficulty in sleeping, insomnia, and other sleep disorders *','Loss of self-esteem','Abandonment or loss of interest in favorite pastimes','Unexpected and dramatic decline in academic performance','Weight loss and loss of appetite, which could indicate an eating disorder','Personality shifts and changes, such as aggressiveness and excess anger that are sharply out of character and could indicate psychological, drug, or sexual problems','Changes in sleep patterns','Unexpected weeping or excessive moodiness','Eating habits that result in noticeable weight loss or gain','Expressions of hopelessness or worthlessness','Paranoia and excessive secrecy','Self-mutilation, or mention of hurting himself or herself','Obsessive body-image concerns','Excessive isolation','Abandonment of friends and social groups','Avoidance of food and noticeable changes in eating habits should trigger concern.','Purging (forced vomiting) after eating — be alert for both dramatic weight loss without changes in eating habits (which could, of course, indicate other health issues that require a doctor’s attention) and also for immediate trips to the bathroom or other private spot after a meal.','Lying','Over-reactive arguing','An awkward phase', 'Defiance','Abandoning commitments','Withdrawal','Attitude. “Teenager” and “bad attitude”','Impulsivity','Academic problems','Curfew violations'];

//================================================================//
//event listeners

window.addEventListener('load', appendOptions);
document.getElementById('add-behavior').addEventListener('click', pushBehaviorToList);
//event listeners for function removeBehavior is added in function pushBehaviorList
document.getElementById('start-query').addEventListener('click', createPythonArray);
//function cleanPythonArray is called after createPythonArray followed by sendToPython if everything is ready

//================================================================//

function appendOptions() {
  var datList = document.getElementById('behavior-options');
  
  ABD.sort(compareName);
  
  for(var i=0;i<ABD.length;++i){
    var newOpt = document.createElement('option');
    newOpt.value = ABD[i];
    
    datList.append(newOpt);
//    console.log(newOpt);
  }
//  console.log(ABD);
}

//================================================================//
//This functions sorts array items so it is always in alphabetical order

function compareName(a,b) {   
    if (a.toLowerCase() < b.toLowerCase()) return -1;   
    if (a.toLowerCase() > b.toLowerCase()) return 1;
  return 0;
}

//================================================================//
//This function creates a list of behaviors when selected

function pushBehaviorToList() {
  var optValue = document.getElementById('input-options').value;
  var bevList = document.getElementById('behavior-list');
  var datList = document.getElementById('behavior-options');
  //This will push the selected behavior to a list with a remove button if needed
  
  if(optValue !== ''){
    var newBev = document.createElement('li');
    var bevButton = document.createElement('button');
    var liVal = document.createTextNode(optValue);
    var butVal = document.createTextNode('remove');
    
    bevButton.append(butVal);
    bevButton.addEventListener('click', removeBehavior);
    bevButton.value = count;
    newBev.id = count;
    newBev.append(liVal);
    newBev.append(bevButton);
    bevList.append(newBev);
    
    --count;
  }else {
    //Add content here to ask user to select a value;
  }
  
  document.getElementById('input-options').value = '';
  event.preventDefault();
}

//================================================================//
//removes the associated list item 

function removeBehavior() {
  var idName = this.value;
  
  var bevList = document.getElementById('behavior-list');
  var liVal = document.getElementById(idName);
  
  bevList.removeChild(liVal);
  
  event.preventDefault();
}

//================================================================//
//collects all behavior list items and pushes them to a python file

function createPythonArray() {
  var pythonList = [];
  var bevListItems = document.getElementById('behavior-list').getElementsByTagName('li');
  
  for(var i=0; i<bevListItems.length; ++i){
    pythonList.push(bevListItems[i].firstChild.nodeValue.replace(/[^\x00-\x7F]/g, ''));
  }
  
//  console.log(pythonList);
  cleanPythonArray(pythonList);
  event.preventDefault();
}

//================================================================//
//This code is borrowed from user georg in thread https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
//removal of ascii characters borrowed from Zaffy in thread https://stackoverflow.com/questions/20856197/remove-non-ascii-character-in-string

function cleanPythonArray(arr){
  
  newArray = arr.filter(function(item, pos, self){
    return self.indexOf(item) == pos;
  });
  
  console.log(newArray);
  sendToPython(newArray);
}

//================================================================//
//This is the final code that sends the list to python for evaluation


function sendToPython(input) {
  var sendData = JSON.stringify(input);
  $.ajax(
    {
      method: 'POST',
      url: BASE_URL,
      data: sendData,
      success: function(data) {
          var result = JSON.parse(data); 
          dictArr.push(result);
          console.log("I'm listening to this python file right meow");
          console.log(result);
      },
      error: reportAjaxError
    });
  
}



function reportAjaxError() {
  console.log('Oh no! There was an error somewhere');
}