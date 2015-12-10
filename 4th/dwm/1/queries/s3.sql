SELECT
	CONCAT(HOUR(T.TimeClockTime) + 1, ':00') AS 'TimeOfDay(24Hour)',
	COUNT(*) AS 'TotalSeizureNotices'
FROM
	SeizureNotice AS SN
    JOIN Time AS T ON SN.TimeID = T.TimeID
GROUP BY
	HOUR(T.TimeClockTime)
	WITH ROLLUP
