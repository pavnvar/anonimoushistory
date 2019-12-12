


// var params={
//   active:true,
//   currentWindow:true
// };

// chrome.tabs.query(params,gotTabs);
// function gotTabs(tabss){
//   console.log(tabss);
// }

var active_link;
var previous_active_link;
var active_title;
var previous_active_title;

var array_obj={
  url_array:[],
  title_array:[],
  start_time:[],
  end_time:[]

};
   // var tab_details={
    //     urll:url_array,
    //     titl:title_array,    //making an object of tab details and storing it in google cache
    //     start:start_time,
    //     end:end_time
    // };
      

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
          
          previous_active_link=active_link;
          previous_active_title=active_title;
          active_link=sender.tab.url;
          active_title=sender.tab.title;
          if(previous_active_title!=undefined)
          {
          var prev_presence=array_obj.title_array.indexOf(previous_active_title);
          if(array_obj.start_time[prev_presence].length==1)
          array_obj.end_time[prev_presence]=[new Date().toString()];
          else if(array_obj.start_time[prev_presence].length>1)
          array_obj.end_time[prev_presence].push(new Date().toString());
          }
          if(!array_obj.title_array.includes(active_title)){
            array_obj.title_array.push(active_title);
            array_obj.url_array.push(active_link);
            array_obj.start_time.push([new Date().toString()]);     
            
          }
          else{
            var presence=array_obj.title_array.indexOf(active_title);
            array_obj.start_time[presence].push(new Date().toString());
          }
    
          console.log(array_obj);
          
  chrome.storage.sync.set({"array_obj":array_obj},function(){
    console.log("cache stored");
    });

  });


  chrome.tabs.onActivated.addListener(function (activeinfo){
    chrome.tabs.get(activeinfo.tabId, function(tab_details){
          previous_active_link =active_link;
          previous_active_title=active_title;
          active_link=tab_details.url;
          active_title=tab_details.title;
          if(previous_active_title!=undefined)
          {
          var prev_presence=array_obj.title_array.indexOf(previous_active_title);
          if(array_obj.start_time[prev_presence].length==1)
          array_obj.end_time[prev_presence]=[new Date().toString()];
          else if(array_obj.start_time[prev_presence].length>1)
          array_obj.end_time[prev_presence].push(new Date().toString());
          }
      if(!array_obj.title_array.includes(tab_details.title)){
        array_obj.title_array.push(active_title);
        array_obj.url_array.push(active_link);
        array_obj.start_time.push([new Date().toString()]);     
      }

      else{
          var presence=array_obj.title_array.indexOf(active_title);
          array_obj.start_time[presence].push(new Date().toString());
      }


    })
    console.log(array_obj);
  
  chrome.storage.sync.set({array_obj},function(){
    console.log("cache stored");
    });
  })


