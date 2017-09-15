In the square class definition, under the render function, why is it that button has the prop className? Isn't it already in the class? Why that extra indicator? 
-the reason the className="square" is in there is because that is what will be written to the virtual dom and eventually the dom and that tells teh css how to style the button we're working on. That the class/the component/the function in react.js has the same name is merely incedental.

why isn't there a paragraph box or text box surrounding {this.state.value}? If that's where the "X" is supposed to appea -- actually nevermind, from w3schools it says that the correct syntax for a button is something like this:
 <button type="button">Click Me!</button> 

the type attribute in the above exmple is a to indicate to the browser what type of button it is.

why do you need to define render square twice--once in the square class and another time in the board component?

My biggest question is with the handleclick thing. where is it defined what hapens once the button is clicked? the button calls its props and the onClick prop just returns a function "handleClick" which isn't very descriptive.
never mind, this was detailed in the next step. a handle click function was the next thing I had to write.

ah so in the handle click function sets the state listed in the (squares) with the local variable in the handle click function. for some reason for which I am not to certain, I can't change the state of the squares array in the board directly. Why is that?

why can't I just write Board.state.squares[i]= 'X';? in the handle click function?

removed square class because it only had a render function--replaced it instead witha a function that takes props as input and renders the square.

ohhhh so the state is just a javascript object that gets periodically modified by the rest of your code!!!! I seeee. 

