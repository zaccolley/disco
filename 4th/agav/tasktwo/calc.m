function [colour, speedResult, speed, width, size] = calc(firstImage, secondImage)
    [widthFirst, heightFirst, distanceFirst] = process(firstImage);    
    [widthLast, heightLast, distanceLast] = process(secondImage);

    [carDistance, speed] = calcSpeed(distanceFirst, distanceLast);
    width = calcWidth(carDistance, widthFirst);
    
    colour = findColour();
    
    if speed > 30
        speedResult = 'Above speed limit';
    else
        speedResult = 'Below speed limit';
    end
    
    if width > 2.5
       size = 'Oversized';
    else
       size = 'Normal size';
    end
    
end