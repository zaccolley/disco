function [colour, speed, size] = test(firstImage, secondImage)
    [widthFirst, heightFirst, distanceFirst] = process(firstImage);
    [widthLast, heightLast, distanceLast] = process(secondImage);

    [carDistance, speed] = calcSpeed(distanceFirst, distanceLast);
    width = calcWidth(carDistance, widthFirst)
    
    colour = findColour();
    
    if speed > 30
        speed = 'above speed limit';
    else
        speed = 'below speed limit';
    end
    
    if width > 2.5
       size = 'over sized';
    else
       size = 'normal size';
    end
    
end