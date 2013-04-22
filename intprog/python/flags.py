#-------------------------------------------------------------------------------
# Lecture P09 - Demonstration of functions
# Matthew Poole
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from graphics import *

# Original version. Poor, overly-long, repetitive, code.

def drawSomeFlags():
    # Draw French flag
    france = GraphWin("France", 120, 80)
    blue = Rectangle(Point(0, 0), Point(40, 80))
    blue.setOutline("blue")
    blue.setFill("blue")
    blue.draw(france)
    white = Rectangle(Point(40, 0), Point(80, 80))
    white.setOutline("white")
    white.setFill("white")
    white.draw(france)
    red = Rectangle(Point(80, 0), Point(120, 80))
    red.setOutline("red")
    red.setFill("red")
    red.draw(france)

    # Draw Italian flag
    italy = GraphWin("Italy", 150, 100)
    green = Rectangle(Point(0, 0), Point(50, 100))
    green.setOutline("green")
    green.setFill("green")
    green.draw(italy)
    white = Rectangle(Point(50, 0), Point(100, 100))
    white.setOutline("white")
    white.setFill("white")
    white.draw(italy)
    red = Rectangle(Point(100, 0), Point(150, 100))
    red.setOutline("red")
    red.setFill("red")
    red.draw(italy)

    # Draw Belgian flag
    belgium = GraphWin("Belgium", 180, 120)
    black = Rectangle(Point(0, 0), Point(60, 120))
    black.setOutline("black")
    black.setFill("black")
    black.draw(belgium)
    yellow = Rectangle(Point(60, 0), Point(120, 120))
    yellow.setOutline("yellow")
    yellow.setFill("yellow")
    yellow.draw(belgium)
    red = Rectangle(Point(120, 0), Point(180, 120))
    red.setOutline("red")
    red.setFill("red")
    red.draw(belgium)

    # Draw Irish flag
    ireland = GraphWin("Ireland", 120, 80)
    green = Rectangle(Point(0, 0), Point(40, 80))
    green.setOutline("green")
    green.setFill("green")
    green.draw(ireland)
    white = Rectangle(Point(40, 0), Point(80, 80))
    white.setOutline("white")
    white.setFill("white")
    white.draw(ireland)
    orange = Rectangle(Point(80, 0), Point(120, 80))
    orange.setOutline("orange")
    orange.setFill("orange")
    orange.draw(ireland)


#-------------------------------------------------------------------------------
# New version developed in the lecture - reduced repetition and complexity

def drawRectangle(win, point1, point2, colour):
    rectangle= Rectangle(point1, point2)
    rectangle.setOutline(colour)
    rectangle.setFill(colour)
    rectangle.draw(win)

def drawTricolor(win, colour1, colour2, colour3):
    win.setCoords(0, 0, 3, 1)
    drawRectangle(win, Point(0, 0), Point(1, 1), colour1)
    drawRectangle(win, Point(1, 0), Point(2, 1), colour2)
    drawRectangle(win, Point(2, 0), Point(3, 1), colour3)

def drawSomeFlags2():
    france = GraphWin("France", 300, 200)
    drawTricolor(france, "blue", "white", "red")
    italy = GraphWin("Italy", 150, 100)
    drawTricolor(italy, "green", "white", "red")
    belgium = GraphWin("Belgium", 180, 120)
    drawTricolor(belgium, "black", "yellow", "red")
    ireland = GraphWin("Ireland", 120, 80)
    drawTricolor(ireland, "green", "white", "orange")



#-------------------------------------------------------------------------------
# Another possibly improvement. This includes a createTricolour function 
# that creates a window of a given width and draws a tricolour in it.

def createTricolour(title, width, colour1, colour2, colour3):
    win = GraphWin(title, width, 2 * width / 3)
    win.setCoords(0, 0, 3, 1)
    drawRectangle(win, Point(0, 0), Point(1, 1), colour1)
    drawRectangle(win, Point(1, 0), Point(2, 1), colour2)
    drawRectangle(win, Point(2, 0), Point(3, 1), colour3)

def drawSomeFlags3():
    createTricolour("France", 120, "blue", "white", "red")
    createTricolour("Italy", 150, "green", "white", "red")
    createTricolour("Belgium", 180, "black", "yellow", "red")
    createTricolour("Ireland", 120, "green", "white", "orange")

