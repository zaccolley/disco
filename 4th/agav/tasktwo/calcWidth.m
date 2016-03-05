function width = calcWidth(carDistance, carWidth)
    pixelViewAngle = 0.042; % degrees
    cameraHeight = 7;       % meters

    carWidthAngle = (carWidth / 2) * pixelViewAngle;
   
    distanceFromCamera = sqrt(carDistance.^2 + cameraHeight.^2);
    width = 2 * (distanceFromCamera * abs(tand(carWidthAngle))); 
end