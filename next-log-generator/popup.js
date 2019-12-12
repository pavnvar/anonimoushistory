
(function name() {
    var url_array=[];
    var title_array=[];
    var start_array=[];
    var end_array=[];
    var host_name=[];
    var entered = false;
    
    chrome.storage.sync.get(['array_obj'],function(result){
        
        
        url_array=result.array_obj.url_array;
        title_array=result.array_obj.title_array;
        
        start_array=result.array_obj.start_time;
        end_array=result.array_obj.end_time;
        for(var a=0;a<url_array.length;a++)
        {
            var url = new URL(url_array[a]);
            host_name.push(url.hostname);
        }
        
        for(var a=0;a<url_array.length;a++){
            
            var node=document.createElement("li");
            var node1=document.createElement("a");
            
            node1.innerHTML=host_name[a];
            node1.href="#xma";
            node.appendChild(node1);
            document.getElementById("MyList").appendChild(node);

        }
        var messag="<div class='popup-content'><ul id='MyList2' class='duration'><h3>Duration accesed and links</h3></ul><a href='' class='close'>x</a></div>";

        
        
        
        var x=document.querySelectorAll("li a");
        for(var a=0;a<x.length;a++)
        {
            x[a].onclick=function(link_object){
            console.log("somethings clicked");
            document.getElementById("xma").style.display = "block";
            var index=host_name.indexOf(link_object.path[0].firstChild.nodeValue);
            console.log(link_object.path[0].firstChild.nodeValue)
            console.log(index);
            console.log(start_array[index]);
            document.getElementById("xma").innerHTML=messag;
            var node=document.createElement("li");
            var node1=document.createElement("a");
            node1.innerHTML=url_array[index];
            node1.href=url_array[index];
            node.appendChild(node1);
            document.getElementById("MyList2").appendChild(node);
            var length_start=start_array[index].length;
            for(var b=0;b<length_start;b++){
                var node=document.createElement("li");
                var dur=start_array[index][b]+"---"+end_array[index][b];
                console.log(start_array[index][b]);
                node.innerHTML=dur;
                document.getElementById("MyList2").appendChild(node);
            }
            
        }

        
        
       }
   
    })
})();