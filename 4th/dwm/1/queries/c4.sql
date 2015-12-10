SELECT
	CONCAT(HOUR(T.TimeClockTime) + 1, ':00') AS 'TimeOfDay(24Hour)',
	COUNT(*) AS 'TotalVehicleTheft'
FROM
	VehicleTheft AS VT
    JOIN Time AS T ON VT.TimeID = T.TimeID
GROUP BY
	HOUR(T.TimeClockTime)
	WITH ROLLUP
