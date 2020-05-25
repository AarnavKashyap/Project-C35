var database;
var yesButton,noButton;
var yes,no,total;
var Yes,No,Total;
var yesRecord,noRecord,totalRecord;
var gameState = 0;
var extraButton1,extraButton2,extraButton3,extraButton4;



function setup() {
  createCanvas(800,400);
  
  database = firebase.database();

  
  yesButton = createButton("YES");
  noButton = createButton("NO");
extraButton1 = createButton("100");
extraButton2 = createButton("500");
extraButton3 = createButton("1000");
extraButton4 = createButton("MORE");
  
yes = database.ref('records/yes');
yes.on("value",readYes,showError);

no = database.ref('records/no');
no.on("value",readNo,showError);

total = database.ref('records/total');
total.on("value",readTotal,showError);
}

function draw() {
  background(255,255,0); 
  textSize(36); 
  text("Aarnav's Survey",280,50);
  if(yesRecord!=undefined && noRecord!=undefined && totalRecord!=undefined){
    yesButton.position(370,240);
    noButton.position(425,240);
   
    

    console.log(yesRecord,noRecord,totalRecord);

    if(gameState === 0){
      textSize(24);
      text("Do you think we need to have free lunch meals in our school canteen for ",20,175);
      text("kids who are very poor?",300,200);
      textSize(18);
      text("Please Answer these questions",290,70);

     noButton.mousePressed(function(){
       

       totalRecord++
       noRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("NO");
       gameState = 1;
     })
     yesButton.mousePressed(function(){
      

      yesRecord++
       totalRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("YES");
       gameState = 1;
     })
    }
    if(gameState === 1){
      textSize(24);
      text("Would you be willing to contribute a small amount every month for such ",20,175);
      text("a program?",300,200);
      textSize(18);
      text("Please Answer these questions",290,70);

     noButton.mousePressed(function(){
       noButton.hide();
       yesButton.hide();

       totalRecord++
       noRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("NO");
       gameState = 2;
     })
     yesButton.mousePressed(function(){
       yesButton.hide();
       noButton.hide();

      yesRecord++
       totalRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("YES");
       gameState = 2;
     })
    }
    if(gameState === 2){
      extraButton1.position(370,240);
      extraButton2.position(425,240);
      extraButton3.position(370,270);
      extraButton4.position(425,270);

      textSize(24);
      text("How much per month would you be willing to pay? ",20,175);
      //text("kids who are very poor",300,200);
      textSize(18);
      text("Please Answer these questions",290,70);

     extraButton1.mousePressed(function(){
       extraButton1.hide();
       extraButton2.hide();
extraButton3.hide();
extraButton4.hide();
       totalRecord++
       noRecord++
       yesRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("Ok");
       gameState = 3;
     })
     extraButton2.mousePressed(function(){
      extraButton1.hide();
       extraButton2.hide();
extraButton3.hide();
extraButton4.hide();

      yesRecord++
       totalRecord++
       noRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("Ok");
       gameState = 3;
     })
     extraButton3.mousePressed(function(){
      extraButton1.hide();
       extraButton2.hide();
extraButton3.hide();
extraButton4.hide();

      yesRecord++
       totalRecord++
       noRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("Ok");
       gameState = 3;
     })
     extraButton4.mousePressed(function(){
      extraButton1.hide();
       extraButton2.hide();
extraButton3.hide();
extraButton4.hide();

      yesRecord++
       totalRecord++
       noRecord++
       writeNo(yesRecord,noRecord,totalRecord);
       console.log("Ok");
       gameState = 3;
     })
     
    }
    if(gameState === 3){
      textSize(32);
      text("Thank You for your response",10,200);
      textSize(20)
      text("There have been " + totalRecord + " who have given their opinion on this matter and out of that ",10,225);
      text(yesRecord+" people agree with it and "+noRecord+" people who disagree with it",10,245);
    }
  }
  
}
function writeNo(yes,no,total){
database.ref('records').set({
  'yes':yes,
  'no':no,
  'total':total
})
}
function readYes(data){
  Yes = data.val();
  yesRecord = Yes;
}
function readNo(data){
  No = data.val();
  noRecord = No;
}
function readTotal(data){
  Total = data.val();
  totalRecord = Total;
}
function showError(){
  console.log("There is something wrong in the code/database");
}