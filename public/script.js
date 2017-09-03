console.log("client side js is running");
//global counter
var globalid=0;


//complete!!
window.onload=getAllTodosAjax();

//Returns the todos json object!!
//complete
function getAllTodosAjax()
{
    var http1=new XMLHttpRequest();
    http1.onreadystatechange=function ()
    {
        if (http1.readyState ==4)
        {
            if (http1.status ==200)
            {
                var obj=JSON.parse(http1.responseText);
                Object.keys(obj).forEach(
                    function(key)
                    {
                        if(obj[key].status=="Active")
                        {
                            globalid++;
                            var tempobj=makeDiv1Element(obj[key].title,globalid);
                            var parent=document.getElementById("div1");
                            parent.appendChild(tempobj);
                        }else if(obj[key].status=="Completed")
                        {
                            globalid++;
                            var tempobj=makeDiv2Element(obj[key].title,globalid);
                            var parent=document.getElementById("div2");
                            parent.appendChild(tempobj);
                        }else
                        {
                            globalid++;
                            var tempobj=makeDiv3Element(obj[key].title,globalid);
                            var parent=document.getElementById("div3");
                            parent.appendChild(tempobj);
                        }
                    }
                )
            }
            else {
                console.log(http1.responseText);
            }
        }
    };
    http1.open("GET","/api/todos",true);
    http1.send(data=null);
}


//newtitle=" "& newstatus=" "
//complete
function PutAjax(id,newstatus)
{
    console.log("put ajax request");
    var http1=new XMLHttpRequest();
    http1.onreadystatechange=function ()
    {
        if (http1.readyState ==4) {
            if (http1.status == 200) {
                var obj = JSON.parse(http1.responseText);
                var tempobj = obj[id];
                if (newstatus == "Completed") {
                    var temp = makeDiv2Element(tempobj.title, id);
                    var oldparent = document.getElementById("div1");
                    var child = document.getElementById("div1-" + id);
                    oldparent.removeChild(child);
                    var newparent = document.getElementById("div2");
                    newparent.appendChild(temp);
                } else if (newstatus == "Active") {
                    var temp = makeDiv1Element(tempobj.title, id);
                    var oldparent = document.getElementById("div2");
                    var child = document.getElementById("div2-" + id);
                    oldparent.removeChild(child);
                    var newparent = document.getElementById("div1");
                    newparent.appendChild(temp);
                }
            }
        }
    };
    http1.open("PUT","/api/todos/"+id,true);
    http1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="newstatus="+newstatus;
    http1.send(data);
}

//for section 2
//Ajax call to add/post new toodo with active status
function PostTodoAjax()
{
    var title=document.getElementById("ip1").value;
    var http1=new XMLHttpRequest();
    http1.onreadystatechange=function ()
    {
        if (http1.readyState ==4)
        {
            if (http1.status ==200)
            {
                globalid++;
                var obj=JSON.parse(http1.responseText);
                var child=makeDiv1Element(obj[globalid].title,globalid);
                var parent=document.getElementById("div1");
                parent.appendChild(child);
            }
            else {
                console.log(http1.responseText);
            }
        }
    };
    http1.open("POST","/api/todos",true);
    http1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="inputedtitle="+encodeURI(title);
    http1.send(data);
}

// expects id in the javascript object
function deleteAjax(id1,parentdivid,childdivid,title)
{
    var http1=new XMLHttpRequest();
    http1.onreadystatechange=function ()
    {
        if (http1.readyState ===4)
        {
            if (http1.status ===200)
            {
                //makeDiv3Element(title,ctr)

                var parent=document.getElementById(parentdivid);
                var child=document.getElementById(childdivid);
                parent.removeChild(child);
                var temp=makeDiv3Element(title);
                var parent2=document.getElementById("div3");
                parent2.appendChild(temp);
            }
            else {
                console.log(http1.responseText);
            }
        }
    };
    http1.open("DELETE","/api/todos/"+id1,true);
    http1.send();
}


//makes one sub-element of div1
//title=title of todos
function makeDiv1Element(title,gid)
{
    var x=document.createElement("div");
    x.setAttribute("id","div1-"+gid);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "checkbox");

    var newstatus="Completed";
    y.setAttribute("onclick","PutAjax("+gid+",'"+newstatus+"')");

    var z=document.createElement("button");
    z.innerText="X";
    z.className="cross";
    var parent="div1";
    var child="div1-"+gid;

    var temp=gid;
    z.setAttribute("onclick","deleteAjax("+gid+",'"+parent+"','"+child+"','"+title+"')");

    var t = document.createTextNode(title);
    var s=document.createTextNode("               ");

    x.appendChild(y);
    x.appendChild(t);
    x.appendChild(s);
    x.appendChild(z);
    return x;
}
function makeDiv2Element(title,gid)
{
    var x=document.createElement("div");
    x.setAttribute("id","div2-"+gid);

    var y = document.createElement("INPUT");
    y.setAttribute("type", "checkbox");

    var newstatus="Active";
    y.setAttribute("onclick","PutAjax("+gid+",'"+newstatus+"')");
   // y.setAttribute("onclick","PutAjax(gid,newstatus)");

    var z=document.createElement("button");
    z.innerText="X";
    z.className="cross";

    var parent="div2";
    var child="div2-"+gid;
    z.setAttribute("onclick","deleteAjax("+gid+",'"+parent+"','"+child+"','"+title+"')");
   // z.setAttribute("onclick","deleteAjax(gid,parent,child,title)");

    var t = document.createTextNode(title);
    var s=document.createTextNode("               ");

    x.appendChild(y);
    x.appendChild(t);
    x.appendChild(s);
    x.appendChild(z);
    return x;
}

//complete!!!
function makeDiv3Element(title,gid)
{
    var x=document.createElement("div");
    x.setAttribute("id","div3-"+gid);

    x.innerText=title;
    return x;
}

function hideCompleted()
{
    var parent=document.getElementById("div2");
    var temp=parent.innerHTML;
    parent.innerHTML="";

    /*var oldbutton=document.getElementById("b2");
    var obj=document.body;
    obj.removeChild(oldbutton);
    */
}
function hideDeleted()
{
    var parent=document.getElementById("div3");
    var temp=parent.innerHTML;
    parent.innerHTML="";
}
