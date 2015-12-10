SELECT
	TimeYear AS 'Year',
	TimeMonthName AS 'Month',
	LocationCityName AS 'City',
	COUNT(*) AS 'TotalVehicleThefts'
FROM
	VehicleTheft AS VT
	JOIN Vehicle AS V ON VT.VehicleID = V.VehicleID
	JOIN Suspect AS S ON VT.SuspectID = S.SuspectID
	JOIN Time AS T ON VT.TimeID = T.TimeID
	JOIN TimeDay AS TD ON T.TimeDayID = TD.TimeDayID
	JOIN TimeMonth AS TM ON TD.TimeMonthID = TM.TimeMonthID
	JOIN TimeYear AS TY ON TM.TimeYearID = TY.TimeYearID
	JOIN Location AS L ON VT.LocationID = L.LocationID
	JOIN LocationCity AS LC ON L.LocationCityID = LC.LocationCityID
GROUP BY
	TY.TimeYear, TM.TimeMonthName, LC.LocationCityName
	WITH ROLLUP
