When you want to request put or delete request, you should use the method override 
because http request does not support put and delete method. 
The way you can do that is to use the library, method override, and add ?_method=PUT or ?_method=DELETE after the route name. 


EX) action="/blogs/<%= blog._id %>?_method=PUT" method="POST"

* For the method override, you should download the library method-override
  npm install method-override --save



Also, notice that the real method that you use in the form tag is POST. (this is a kind of cheating).

Q. Is it the necessary? 
	No, but this is the convention for the RESTful route. So it is highly recommended.



If you don't understand this, take a look at edit.ejs file in the view directory.