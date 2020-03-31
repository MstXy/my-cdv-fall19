## Lab 7 exercise
There are still some bug in the finished work which I could not figure out why.
The first issue is the delay function, if i don't wait for the current animation to finish and press the button to call the next animation, the current one will freeze. For example, if a newly-added rect's fill color is changing from pink to black, then if I add a new rect/datapoint before the previous changing finished, the fill color of the former one will freeze at a color between pink and black. And it will remain so until it is removed.
Another issue is that sometimes the remove function would remove 2 or 3 rectangles while only removing one from the data point, it comes back to normal when press add again: it will add one data point while adding two rectangles.
Another thing is that it seems the update methods are conflicting with the animations.
Like, for the updating of rectangles and axis, i could just set the .delay() time to be longer, but if i want to change the data after the update, it just collide with previous animations. And if I use setInterval to delay the change of data, it is still buggy.
