#------------------------------------------------------------------------------
# Practical Worksheet 3: Programming with Graphics
# Zac Colley
# 665219
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

from graphics import *
import math

def drawStickFigure():
    win = GraphWin("Stick figure")
    head = Circle(Point(100, 60), 20)
    head.draw(win)
    body = Line(Point(100, 80), Point(100, 120))
    body.draw(win)
    # exercise 1
    arms = Line(Point(80,85), Point(120,85))
    arms.draw(win)
    leg1 = Line(Point(100,120), Point(80, 140))
    leg1.draw(win)
    leg2 = Line(Point(100,120), Point(120,140))
    leg2.draw(win)


def drawLine():
    win = GraphWin("Line drawer")
    message = Text(Point(100,100), "Click on first point")
    message.draw(win)
    p1 = win.getMouse()
    message.setText("Click on second point")
    p2 = win.getMouse()
    line = Line(p1, p2)
    line.draw(win)
    message.setText("Click anywhere to quit")
    win.getMouse()
    win.close()

# exercise 2

def drawCircle():
    win = GraphWin("Circle drawer")
    message = Text(Point(100,20), "Enter radius here:")
    message.draw(win)
    inputbox = Entry(Point(100,45),5)
    inputbox.draw(win)
    win.getMouse()
    message.setText("Radius of " + str(inputbox.getText()) + " radius.")
    circle = Circle(Point(100,100), int(inputbox.getText()))
    circle.draw(win)
    message.setText("Click to close.")
    win.getMouse()
    win.close()

# exercise 3

def drawArcheryTarget():
    win = GraphWin("Target drawer")

    bluetarg = Circle(Point(100,100),15)
    redtarg = Circle(Point(100,100),10)
    yellowtarg = Circle(Point(100,100),5)

    bluetarg.setFill("Blue")
    redtarg.setFill("Red")
    yellowtarg.setFill("Yellow")

    bluetarg.draw(win)
    redtarg.draw(win)
    yellowtarg.draw(win)

# exercise 4

def drawRectangle():

    height = eval(input("Enter height:"))
    width = eval(input("Enter width:"))

    win = GraphWin("Rectangle drawer")

    firstpoint = Point(100-(width/2),100-(height/2))
    secpoint = Point(100+(width/2),100+(height/2))

    rectangle = Rectangle(firstpoint,secpoint)
    rectangle.draw(win)

# exercise 5

def blueCircle():
    win = GraphWin()
    p = win.getMouse()
    bluecircle = Circle(Point(p.getX(),p.getY()),50)
    bluecircle.setOutline("Blue")
    bluecircle.setFill("Blue")
    bluecircle.draw(win)

# exercise 6

def tenLines():
    win = GraphWin("Line drawer")
    for i in range(10):
        message = Text(Point(100,10), "Click on first point for point no: " + str(i))
        message.draw(win)
        p1 = win.getMouse()
        message.setText("Click on second point for point no: " + str(i))
        p2 = win.getMouse()
        line = Line(p1, p2)
        line.draw(win)
        message.setText(" ")
    message.setText("Click anywhere to quit")
    win.getMouse()
    win.close()

# exercise 7

def tenStrings():
    win = GraphWin("String placer")
    inputbox = Entry(Point(100,10),10)
    inputbox.draw(win)
    for i in range(10):
        p = win.getMouse()
        text = Text(p,inputbox.getText())
        text.draw(win)
    win.getMouse()
    win.close()

# exercise 8

def tenColouredRectangles():
    win = GraphWin("Coloured rectangles",500,500)
    inputbox = Entry(Point(250,20),10)
    inputbox.draw(win)
    inputbox.setText("Blue")
    for i in range(10):
        p1 = win.getMouse()
        p2 = win.getMouse()
        rectangle = Rectangle(p1,p2)
        rectangle.draw(win)
        rectangle.setFill(inputbox.getText())
        rectangle.setOutline(inputbox.getText())

# exercise 9

def fiveClickStickFigure():
    win = GraphWin("Stick figure")

    headPoint1 = win.getMouse()
    headPoint2 = win.getMouse()
    a = (headPoint2.getX() - headPoint1.getX()) ** 2
    b = (headPoint2.getY() - headPoint1.getY()) ** 2
    headPointRadius = math.sqrt(a + b)
    head = Circle(headPoint1,headPointRadius)
    head.draw(win)

    mouseClick = win.getMouse()
    bodyPoint1 = Point(headPoint1.getX(), mouseClick.getY())
    bodyPoint2 = Point(headPoint1.getX(), (headPoint1.getY() + headPointRadius))
    body = Line(bodyPoint1,bodyPoint2)
    body.draw(win)

    armPoint1 = win.getMouse()
    armPoint2 = Point((2 * headPoint1.getX() - armPoint1.getX()),armPoint1.getY())
    arm = Line(armPoint1,armPoint2)
    arm.draw(win)

    legPoint1 = win.getMouse()
    legPoint2 = Point((2 * headPoint1.getX() - legPoint1.getX()),legPoint1.getY())
    leg1 = Line(bodyPoint1,legPoint1)
    leg2 = Line(bodyPoint1,legPoint2)
    leg1.draw(win)
    leg2.draw(win)

# exercise 10

def plotRainfall():
    win = GraphWin("Rainfall",700,500)
    win.setBackground("White")

    origin = Point(150,400)
    xAxisP = Point(525,400)
    xAxis = Line(origin,xAxisP)
    xAxis.setArrow("last")
    xAxis.draw(win)

    yAxisP = Point(150,50)
    yAxis = Line(origin,yAxisP)
    yAxis.setArrow("last")
    yAxis.draw(win)

    xTextP = Point(60,200)
    xText = Text(xTextP,"Rainfall (mm)")
    xText.draw(win)

    for i in range(8):
        xPadding = 100
        x = xPadding + ( 50 * (i+1) )
        y = xAxisP.getY() + 10
        textPlacement = Point(x, y)
        text = Text(textPlacement, str(i))
        text.draw(win)

    yTextP = Point(325,440)
    yText = Text(yTextP,"Day")
    yText.draw(win)

    for i in range(8):
        yPadding = 450
        x = yAxisP.getX() - 20
        y = yPadding - (50 * (i+1))
        textPlacement = Point(x, y)
        text = Text(textPlacement, str(i*100))
        text.draw(win)

    message = Text(Point(600,80),"Enter rainfall and click. ")
    message.draw(win)

    inputBox = Entry(Point(600,120),10)
    inputBox.draw(win)

    for i in range(7):
        win.getMouse()
        rainfallInput = int(inputBox.getText()) / 2
        p1 = Point(origin.getX() + 25 + (i*50), origin.getY())
        p2 = Point(origin.getX() + 75 + (i*50), origin.getY() - rainfallInput )

        rect = Rectangle(p1,p2)


        if i % 2 == 0: # if i is even
            rect.setFill("Blue")
        else:
            rect.setFill("Light Blue")

        if (rainfallInput != 0):
            rect.draw(win)


    message.setText("Click to close")
    win.getMouse()
    win.close()























