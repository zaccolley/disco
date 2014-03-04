# pizza crust is 4cm wide
# 0.5 calories per square cm of base
# 1.25 calories per square cm of toppings

import math

def pizza():
    rad = eval(input("Enter the overall radius of you pizza in cm:"))
    maxcal = eval(input("Enter the maximum number of calories of pizza we should eat in a month:"))
    toppingrad = rad - 4
    print("Radius of topping region is:",toppingrad)
    toppingarea =  math.pi * (toppingrad ** 2)
    print("Area of topping region is:",toppingarea)
    basearea = math.pi * (rad ** 2)
    totalcalories = (toppingarea * 1.25) + (basearea * 0.5)
    print("Total calories in the pizza is:",totalcalories)
    monthlypizza = int(maxcal // totalcalories)
    print("Max number of pizzas allowed in a month:",monthlypizza)

def pizza2():
    pizzasizes = [5,10,15,20,25]
    pizzacal = 0
    for i in pizzasizes:
        toppingrad = i - 4
        toppingarea =  math.pi * (toppingrad ** 2)
        basearea = math.pi * (i ** 2)
        totalcalories = (toppingarea * 1.25) + (basearea * 0.5)
        pizzacal = pizzacal + totalcalories
    print("Calories in 5 pizzas is:",pizzacal)
