#-------------------------------------------------------------------------------
# Practical Worksheet 3: Programming with Graphics
# Zac Colley
# 665219
# Autumn Teaching Block 2012
# ------------------------------------------------------------------------------

from graphics import *

win = GraphWin("Greeter", 400, 300)
message = Text(Point(200,100), "Enter your name and click mouse!")
message.draw(win)
inputBox = Entry(Point(200,200), 10)
inputBox.draw(win)
win.getMouse()
message.setText("Hello, " + inputBox.getText())