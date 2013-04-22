
public class Heater{

    private int temperature;
    private int min;
    private int max;
    private int increment;
    
    public Heater(int minTemp, int maxTemp){        
        temperature = 15;
        min = minTemp;
        max = maxTemp;
        increment = 5;
    }
    
    public void warmer(){       
        temperature += 5;
        if (temperature > max){
            temperature = max;    
        }
    }
    
    public void cooler(){
        temperature -= 5;
        if (temperature < min){
            temperature = min;
        }
    }
    
    public int getTemperature(){
        return temperature;
    }
    
    public void setIncrement(int incrementChange){
        if (incrementChange > 0){
            increment = incrementChange;
        }
    }

}