function width = calcWidth(carDistance, boundingBox)
    imageWidth = 480; % pixels
    centerOfImage = (imageWidth / 2);
    
    pixelViewAngle = 0.042; % degrees
    cameraHeight = 7;       % meters
   
    distanceFromCamera = sqrt(carDistance.^2 + cameraHeight.^2);
    
    carX = boundingBox(1);    
    width = boundingBox(3);
    
    leftOfCarWidth = abs(centerOfImage - carX);
    rightOfCarWidth = abs(centerOfImage - (carX + width));
    
    leftOfCarWidthAngle = leftOfCarWidth * pixelViewAngle;
    rightOfCarWidthAngle = rightOfCarWidth * pixelViewAngle;
    
    leftCarWidth = distanceFromCamera * abs(tand(leftOfCarWidthAngle));
    rightCarWidth = distanceFromCamera * abs(tand(rightOfCarWidthAngle));
    
    width = leftCarWidth + rightCarWidth;
end