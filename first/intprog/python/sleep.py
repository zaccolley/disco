
from graphics import *

# Test

def drawStickFigure():
    win = GraphWin("Stick figure", 300, 200)

    head = Circle(Point(100, 60), 20)
    head.draw(win)

    eye1 = Circle(Point(90,60), 5)
    eye2 = Circle(Point(110,60), 5)
    eye1.draw(win)
    eye2.draw(win)

    eyelid1 = Line(Point(85,60),Point(95,60))
    eyelid2 = Line(Point(105,60),Point(115,60))
    eyelid1.draw(win)
    eyelid2.draw(win)

    body = Line(Point(100, 80), Point(100, 120))
    body.draw(win)

    arms = Line(Point(80,85), Point(120,85))
    arms.draw(win)

    leg1 = Line(Point(100,120), Point(80, 140))
    leg2 = Line(Point(100,120), Point(120,140))
    leg1.draw(win)
    leg2.draw(win)

    startText = "Zzz"
    message = Text(Point(200,50), startText)
    message.draw(win)

    for i in range(5):
        appendedText = "z" * (i + 1)
        win.getMouse()
        message.setText(startText + appendedText)

    win.getMouse()
    message.setText("Good morning!")

    eyelid1.undraw()
    eyelid2.undraw()
