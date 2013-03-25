#-------------------------------------------------------------------------------
# Practical Worksheet 3: Programming with Graphics
# Zac Colley
# 665219
# Autumn Teaching Block 2012
# ------------------------------------------------------------------------------

from graphics import *

win = GraphWin("Man")

centre = Point(100,100)

circle1 = Circle(centre,20)

circle1.draw(win)

circle2 = Circle(Point(90,95), 5)
circle2.draw(win)

circle3 = Circle(Point(110,95), 5)
circle3.draw(win)

p1 = Point(90,95)
p1.draw(win)

p2 = Point(110,95)
p2.draw(win)


circle1.setWidth(2)
circle1.setFill("Yellow")
circle2.setFill("White")
circle3.setFill("White")

line = Line(Point(90,105),Point(110,105))
line.draw(win)

rectangle = Rectangle(Point(87,85), Point(113,80))
rectangle.draw(win)
rectangle.setFill("Black")

r2 = Rectangle(Point(92,85),Point(107,70))
r2.draw(win)
r2.setFill("Black")

text = Text(Point(100,77), "Hi!")
text.draw(win)
text.setSize(6)
text.setTextColor("White")

triangle = Polygon(Point(90,112), Point(90,127), Point(100,119.5) )
triangle.draw(win)
triangle.setFill("Red")

t2 = Polygon(Point(110,112), Point(110,127), Point(100,119.5) )
t2.draw(win)
t2.setFill("Red")

c4 = Circle(Point(100,119.5),3)
c4.draw(win)
c4.setFill("red")






