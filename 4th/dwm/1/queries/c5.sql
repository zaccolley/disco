SELECT
    VehicleMake AS 'Make',
    COUNT(*) AS 'TotalVehicleTheft'
FROM
	VehicleTheft AS VT
	JOIN Vehicle AS V ON VT.VehicleID = V.VehicleID
GROUP BY
	VehicleMake
ORDER BY
	COUNT(*) DESC
