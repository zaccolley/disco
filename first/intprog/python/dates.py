#-------------------------------------------------------------------------------
# dates.py - Examples of decision structures
# Matthew Poole
# Autumn Teaching Block 2012
#-------------------------------------------------------------------------------

# We'll simplify this isLeapYear function in a later lecture / tutorial.
def isLeapYear(year):
    if year % 4 == 0:
        if year % 100 == 0:
            if year % 400 == 0:
                return True
            else:
                return False
        else:
            return True
    else:
        return False

def daysInMonth(month, year):
    if month == 4 or month == 6 or month == 9 or month == 11:
        return 30
    elif month == 2:
        if isLeapYear(year):
            return 29
        else:
            return 28
    else:
        return 31

def overlyComplexDaysInMonth(month, year):
    if month == 1 or month == 3 or month == 5 or month == 7 or \
       month == 8 or month == 10 or month == 12:
        return 31
    elif month == 4 or month == 6 or month == 9 or month == 11:
        return 30
    elif isLeapYear(year):
        return 29
    else:
        return 28
