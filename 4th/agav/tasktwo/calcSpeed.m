function [distance, speed] = calcSpeed(carPixelsFromBottomOfImageFirst, carPixelsFromBottomOfImageLast)
    imageHeight = 640; % pixels
    
    pixelViewAngle = 0.042; % degrees
    cameraHeight = 7; % meters
    shutterSpeed = 0.1; % seconds
    angleToCenterOfCamera = 30; % degrees

    viewAngle = imageHeight * pixelViewAngle;

    angleToBottomOfImage = 90 - angleToCenterOfCamera - (viewAngle / 2);

    carViewAngleFirst = carPixelsFromBottomOfImageFirst * pixelViewAngle;
    carViewAngleLast = carPixelsFromBottomOfImageLast * pixelViewAngle;

    carViewAngleFromVerticalFirst = angleToBottomOfImage + carViewAngleFirst;
    carViewAngleFromVerticalLast = angleToBottomOfImage + carViewAngleLast;

    distanceFirst = cameraHeight * abs(tand(carViewAngleFromVerticalFirst));
    distanceLast = cameraHeight * abs(tand(carViewAngleFromVerticalLast));

    changeInDistance = distanceLast - distanceFirst;

    % v = d / t
    speedMetersPerSecond = changeInDistance / shutterSpeed; % m/s
    speed = convvel(speedMetersPerSecond, 'm/s', 'mph');
    
    distance = distanceFirst;
end