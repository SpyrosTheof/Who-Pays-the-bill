var getlooser=new getLooser();

function getLooser(){
    this.applicants=[];
    this.init=function(){
       this.addApplicants();
       this.getRandomLooser();
       this.runAgain();
       this.startOver();
    };

   this.addApplicants=function(){
    var $this=this;
    var generateList=function(input){
        var value=input.value;
        
        if($this.checkValid(value))
        {   
         
            $this.applicants.push(value.toLowerCase());
            input.value="";
            $this.showList();
        }
        else{

            setTimeout(function(){input.value=""},2000)
            
            console.log("no");
        }
    };

    var addButton=document.querySelector("#add_applicant");
    
    addButton.addEventListener("click",function(){
        var input=document.querySelector("#applicant_value");
        generateList(input);
       
    })
   };

   this.checkValid=function(value){
        value=value.toLowerCase();

        if(this.applicants.indexOf(value)<0 && value!="") {
            console.log(value);
            return true;
        }
    
        else if(this.applicants.indexOf(value)>=0){
            document.querySelector("#msg_already_exists").removeAttribute("class");

            setTimeout(function(){
                document.querySelector("#msg_already_exists").setAttribute("class","hidden")},2000);
                return false;
            
        }

            else if(value=" "){
            document.querySelector("#msg_empty_name").removeAttribute("class");

            setTimeout(function(){
                document.querySelector("#msg_empty_name").setAttribute("class","hidden")},2000);
                return false;
           
        }


   };

   this.showList=function(){
    var parent=document.querySelector('.applicant_list_wrapper');
    var template="";
    for(var i=0;i<this.applicants.length;i++)
    {
        template+="<span class='name-tag' data-id='"+ i +"'>";
        template+=this.applicants[i];
        template+="</span>";
    }
    parent.innerHTML="";
    parent.insertAdjacentHTML("afterbegin",template);

    this.deleteOne();
   };

   this.getRandomLooser=function(){
    var $this=this;
    var getLooserButton=document.querySelector("#show_results");
    getLooserButton.addEventListener("click",function(){
        
        if($this.applicants.length>1)
        {
            var initialPage=document.querySelector(".applicant_container ");
            var resultsPage=document.querySelector(".results_container");
            initialPage.className+=" hidden";
            resultsPage.className="results_container";
            $this.showLooser();
        }

        else{
            console.log(document.querySelector("#msg_applicants_needed"));
            document.querySelector("#msg_applicants_needed").removeAttribute("class");

            setTimeout(function(){
                document.querySelector("#msg_applicants_needed").setAttribute("class","hidden")},2000);
                return false;
        }
        

    });
   };

   this.deleteOne=function(){
    var $this=this;
    var spans=document.querySelectorAll(".name-tag");
    for(var i=0;i<spans.length;i++)
    {
        spans[i].addEventListener('click',function(){
            var index=parseInt(this.getAttribute("data-id"));
            console.log(index);
            $this.applicants.splice(index,"1");
            $this.showList();
        })
    }
   };

   this.showLooser=function(){
       var $this=this;
    var randomIndex=Math.round(Math.random()*($this.applicants.length-1));
        var parentResult=document.querySelector(".result");
        parentResult.innerHTML="";
        parentResult.insertAdjacentHTML("afterbegin","<h3>"+$this.applicants[randomIndex] +"</h3>")
    };

   this.runAgain=function(){
        var $this=this;
        var runAgainButton=document.querySelector(".run_again");
        console.log(runAgainButton);
        runAgainButton.addEventListener("click",function(e){

            $this.showLooser();
        })
   };

   this.startOver=function(){
    var $this=this;
    var startOverButton=document.querySelector(".start_again");
    startOverButton.addEventListener("click",function(){
    var initialPage=document.querySelector(".applicant_container ");
    var resultsPage=document.querySelector(".results_container");
    var parentParticipants=document.querySelector(".applicant_list_wrapper");
            initialPage.className="applicant_container ";
            resultsPage.className+=" hidden";
            parentParticipants.innerHTML="";
            $this.applicants=[];
            
    })
   };


}

getlooser.init();
