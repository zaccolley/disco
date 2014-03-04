/**
 * Read web server data and analyse
 * hourly access patterns.
 * 
 * @author David J. Barnes and Michael Kölling.
 * @version 2011.07.31
 */
public class LogAnalyzer
{
    // Where to calculate the hourly access counts.
    private int[] hourCounts;
    // Use a LogfileReader to access the data.
    private LogfileReader reader;

    /**
     * Create an object to analyze hourly web accesses.
     */
    public LogAnalyzer()
    {         
        // Create the array object to hold the hourly
        // access counts.
        hourCounts = new int[24];
        // Create the reader to obtain the data.
        reader = new LogfileReader();
    }
    
    public LogAnalyzer(String filename)
    {         
        // Create the array object to hold the hourly
        // access counts.
        hourCounts = new int[24];
        // Create the reader to obtain the data.
        reader = new LogfileReader(filename);
    }

    /**
     * Analyze the hourly access data from the log file.
     */
    public void analyzeHourlyData()
    {
        while(reader.hasNext()) {
            LogEntry entry = reader.next();
            int hour = entry.getHour();
            hourCounts[hour]++;
        }
    }

    /**
     * Print the hourly counts.
     * These should have been set with a prior
     * call to analyzeHourlyData.
     */
    public void printHourlyCounts()
    {
        System.out.println("Hr: Count");
        int hour = 0;
        while(hour < hourCounts.length){
            System.out.println(hour + ": " + hourCounts[hour]);
            hour++;
        }
    }
    
    /**
     * Print the lines of data read by the LogfileReader
     */
    public void printData()
    {
        reader.printData();
    }
    
    public int numberOfAccesses()
    {
    int total = 0;
    int hour = 0;
        while(hour < hourCounts.length){
            total = total + hourCounts[hour];
            hour++;
        }
    return total;
    }
    
    public int busiestHour(){        
        int hour = 0;
        int busiestHour = 0;
        while(hour + 1 < hourCounts.length){
            if(hourCounts[busiestHour] < hourCounts[hour]){
                busiestHour = hour;
            }
            hour++;
        }   
        return busiestHour;
    }
    
     public int quietestHour(){        
        int hour = 0;
        int quietestHour = 0;
        while(hour + 1 < hourCounts.length){
            if(hourCounts[quietestHour] > hourCounts[hour]){
                quietestHour = hour;
            }
            hour++;
        }   
        return quietestHour;
    }
    
    public int busiestTwoHour(){
        
        int hour = 0;
        int busiestHour = 0;
        while(hour < hourCounts.length - 2){
            if( (hourCounts[hour] + hourCounts[hour+1]) < (hourCounts[hour+1] + hourCounts[hour+2]) ){
                busiestHour = hour + 1;
            }
            hour++:
        }
        return busiestHour;
    }
    
    
}
